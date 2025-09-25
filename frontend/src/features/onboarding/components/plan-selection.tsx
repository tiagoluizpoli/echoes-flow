import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useOnboarding } from '../context';

interface Plan {
  id: 'starter' | 'growth' | 'enterprise';
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Essencial',
    price: 'R$ 49',
    period: '/mês',
    description: 'Perfeito para igrejas pequenas',
    features: ['Até 200 membros'],
    popular: false,
  },
  {
    id: 'growth',
    name: 'Crescimento',
    price: 'R$ 99',
    period: '/mês',
    description: 'Ideal para igrejas em expansão',
    features: ['Até 1000 membros'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Ministério',
    price: 'R$ 199',
    period: '/mês',
    description: 'Para grandes ministérios',
    features: ['Membros ilimitados'],
    popular: false,
  },
];

export const PlanSelection = () => {
  const { setStep, form } = useOnboarding();
  const { setValue, watch } = form;
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Escolha seu Plano</h2>
        <p className="text-muted-foreground text-lg">
          Selecione o plano ideal para sua igreja
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              watch('plan') === plan.id
                ? 'ring-2 ring-primary shadow-primary/20'
                : ''
            } ${plan.popular ? 'border-primary' : ''}`}
            onClick={() => setValue('plan', plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
            )}

            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {watch('plan') === plan.id && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-primary font-medium text-center">
                    ✓ Plano Selecionado
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <Button onClick={() => setStep(3)}>Continuar</Button>
      </div>
    </div>
  );
};
