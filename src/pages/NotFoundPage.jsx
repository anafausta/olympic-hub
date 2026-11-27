import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { BentoCard } from '../components/ui/BentoCard';
import { Button } from '../components/ui/Button';
import { Compass, Home } from '../components/ui/SolarIcon';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <BentoCard variant="surface" className="max-w-md mx-auto text-center py-16 space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] flex items-center justify-center mx-auto text-[var(--accent-cyan)] shadow-md">
          <Compass className="w-8 h-8 animate-spin" />
        </div>

        <div className="space-y-1">
          <span className="text-3xl font-heading font-black text-[#F9CA20]">404</span>
          <h2 className="text-xl font-heading font-black text-[var(--text-primary)]">
            Página Não Encontrada
          </h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
            O endereço acessado não existe na plataforma ou foi movido para outra seção.
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/')}
            className="gap-2 mx-auto cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Voltar para a Home</span>
          </Button>
        </div>
      </BentoCard>
    </PageContainer>
  );
};
