import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const OnboardingCompletedPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="flex flex-col items-center justify-center gap-4 text-center">
            <Icon icon={'lucide:church'} className="h-16 w-16" />
            Bem vindo ao Echoes Flow
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-8 text-center">
          <p>
            Sua jornada espiritual digital começou. Agora você pode sentir o eco
            da fé se espalhando através da tecnologia.
          </p>

          <div className="divine-glow rounded-2xl p-8 border border-primary/10 space-y-4">
            <div className="font-bold text-xl text-primary">
              Próximos passos na jornada:
            </div>
            <ul className="text-muted-foreground space-y-3 text-left">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary animate-echo"></div>
                <span className="font-medium">
                  Configure seu perfil pastoral
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary animate-echo"></div>
                <span className="font-medium">
                  Conecte-se com sua congregação
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary animate-echo"></div>
                <span className="font-medium">
                  Explore o fluir divino dos recursos
                </span>
              </li>
            </ul>
          </div>

          <Button
            size="lg"
            className="w-full gradient-divine shadow-divine hover:shadow-lg transition-all duration-300 group py-6 text-lg"
          >
            Entrar na Plataforma Divina
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </CardContent>
      </Card> */}
      <Card className="glass-effect border-primary/20 shadow-elegant">
        <CardContent className="pt-12 pb-12 px-8">
          <div className="space-y-10">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 gradient-primary rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-success/20 rounded-full flex items-center justify-center border-4 border-success/20">
                <CheckCircle className={`h-12 w-12 text-success`} />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-balance">
                Bem-vindo ao Módulos do Ministério!
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Sua conta foi criada com sucesso. Você já pode começar a usar a
                plataforma.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 border border-primary/10 space-y-4">
              <div className="font-bold text-xl text-primary text-center">
                Próximos passos
              </div>
              <ul className="text-muted-foreground space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  <span className="font-medium">
                    Configure seu perfil de administrador
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  <span className="font-medium">
                    Importe ou cadastre seus primeiros membros
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  <span className="font-medium">
                    Explore os recursos disponíveis
                  </span>
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              className="w-full gradient-primary shadow-elegant hover:shadow-lg transition-all duration-300 group py-6 text-lg"
            >
              Acessar plataforma
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
