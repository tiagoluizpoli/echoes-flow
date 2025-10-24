import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChurchRepository, UserRepository } from 'src/shared-modules';
import { Church, MemberAssociation } from 'src/shared-modules/core';
import { generateSlug } from 'src/shared-modules/core/utils';
import { CreateChurchParams } from './models/church';

@Injectable()
export class ChurchService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly churchRepository: ChurchRepository,
  ) {}
  async createChurch(churchParams: CreateChurchParams, userId: string) {
    // check cnpj --understand how to later

    // Create Church on DB
    const church = Church.create({
      slug: generateSlug(churchParams.publicName),
      businessName: churchParams.businessName,
      publicName: churchParams.publicName,
      cnpj: churchParams.cnpj,
      description: churchParams.description,
      modulePermissions: [],
      subscriptionStatus: 'pending',
      paymentGatewayCustomerId: undefined,
      contactInfo: churchParams.contactInfo.map((contact) => ({
        type: contact.type,
        value: contact.value,
      })),
      address: churchParams.address,
    });

    await this.churchRepository.create(church);

    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    user.memberAssociations?.push(
      MemberAssociation.create({
        churchId: church.id,
        userId: userId,
        owner: true,
        roles: ['admin', 'member'],
        status: 'active',
        createdAt: new Date(),
      }),
    );

    await this.userRepository.updateUser(user);
  }

  async getUserChurchs(userId: string) {
    return await this.churchRepository.findChurchsByUserId(userId);
  }
}
