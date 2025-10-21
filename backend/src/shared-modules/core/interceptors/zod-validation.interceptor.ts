import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ZodError, ZodObject } from 'zod';

interface ZodValidationInterceptorParams {
  headerSchema?: ZodObject<any>;
  bodySchema?: ZodObject<any>;
  querySchema?: ZodObject<any>;
  paramsSchema?: ZodObject<any>;
}

export class ZodValidationInterceptor implements NestInterceptor {
  constructor(private params: ZodValidationInterceptorParams) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    let validationFailure: 'header' | 'body' | 'query' | 'params' | undefined;
    try {
      const { headerSchema, bodySchema, querySchema, paramsSchema } =
        this.params;
      const request: Request = context.switchToHttp().getRequest();

      if (headerSchema) {
        validationFailure = 'header';
        headerSchema.parse(request.headers);
      }

      if (paramsSchema) {
        validationFailure = 'params';
        paramsSchema.parse(request.params);
      }

      if (querySchema) {
        validationFailure = 'query';
        querySchema.parse(request.query);
      }

      if (bodySchema) {
        validationFailure = 'body';
        bodySchema.parse(request.body);
      }

      return next.handle();
    } catch (error) {
      const zodError = error as ZodError;

      console.log({ zodError });
      throw new BadRequestException(
        `${validationFailure} validation(s) failed.`,
        {
          cause: zodError.issues.map((issue) => ({
            path: `${validationFailure}.${issue.path.join('.')}`,
            expected: (issue as any).values ?? undefined,
            message: issue.message,
          })),
        },
      );
    }
  }
}
