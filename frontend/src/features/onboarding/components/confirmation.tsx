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
import { useOnboarding } from '../context';
import { plans } from './plan-selection';

export const Confirmation = () => {
  const { form, setStep } = useOnboarding();
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Revisar e Confirmar</CardTitle>
        <CardDescription>Confirme os dados antes de finalizar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Church Info Summary */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Church className="h-4 w-4" />
            Dados da Igreja
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Nome:</span>
              <p className="font-medium">{form.watch('churchName')}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Pastor:</span>
              <p className="font-medium">{form.watch('pastorName')}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Email:</span>
              <p className="font-medium">{form.watch('email')}</p>
            </div>
          </div>
        </div>

        {/* Selected Plan Summary */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Plano Selecionado</h3>
          {(() => {
            const plan = plans.find((p) => p.id === form.watch('plan'));
            return plan ? (
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{plan.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{plan.price}</p>
                  <p className="text-sm text-muted-foreground">{plan.period}</p>
                </div>
              </div>
            ) : null;
          })()}
        </div>

        {/* Terms */}
        <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
          <p>
            Ao continuar, você concorda com nossos{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
            . O pagamento será processado de forma segura pelo Stripe.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button
            type="submit"
            // disabled={isLoading}
            className="min-w-[140px]"
          >
            {Date.now() < 0 ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Criando...
              </>
            ) : (
              <>
                Finalizar Cadastro
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
