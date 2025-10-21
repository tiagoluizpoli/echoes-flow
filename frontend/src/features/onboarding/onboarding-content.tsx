import { ArrowLeft, Check, Church } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import { Separator } from '@/components/ui/separator';
import { AddressForm, ChurchInfoForm, ContactInfoForm } from './components';
import { useOnboarding } from './context';
export const OnboardingContent = () => {
  const { form, onSubmit } = useOnboarding();

  const header = (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <div className="flex items-center gap-2">
          <Church className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Echoes Flow</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-b from-background to-secondary/20">
      {header}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
          {/* <OrganizationForm /> */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Dados da sua Igreja</CardTitle>
              <CardDescription>
                Vamos conhecer um pouco mais sobre sua igreja
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ChurchInfoForm />

              <Separator />

              <ContactInfoForm />

              <Separator />

              <AddressForm />

              <div className="w-full flex justify-end">
                <Button
                  type="submit"
                  className="flex items-center justify-start min-w-52"
                >
                  {Date.now() < 0 ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Check className="ml-2 h-4 w-4" />
                      Finalizar Cadastro
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};
