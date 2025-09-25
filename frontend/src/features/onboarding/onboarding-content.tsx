import { ArrowLeft, Church } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import { Confirmation, OrganizationForm, PlanSelection } from './components';
import { useOnboarding } from './context';

export const OnboardingContent = () => {
  const { form, step, onSubmit } = useOnboarding();
  return (
    <div className="w-full bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              1
            </div>
            <div
              className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}
            />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              2
            </div>
            <div
              className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}
            />
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              3
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Church Information */}
            {step === 1 && <OrganizationForm />}

            {/* Step 2: Plan Selection */}
            {step === 2 && <PlanSelection />}

            {/* Step 3: Review and Confirm */}
            {step === 3 && <Confirmation />}
          </form>
        </Form>
      </div>
    </div>
  );
};
