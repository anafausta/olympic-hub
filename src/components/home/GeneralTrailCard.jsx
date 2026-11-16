import { useNavigate } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import { BentoCard } from '../ui/BentoCard';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const GeneralTrailCard = ({ trilhaGeral }) => {
  const navigate = useNavigate();
  const { setActiveOverlayTrilhaId } = useStudent();

  const progress = trilhaGeral?.percentualConclusao ?? 60;
  const isPrepared = progress >= 100; // RF37: Aluno preparado na trilha geral ao atingir 100%

  const handleClick = () => {
    if (trilhaGeral?.id) {
      setActiveOverlayTrilhaId(trilhaGeral.id); // RF36, RF78: Open overlay directly
    }
    navigate('/trilhas');
  };

  return (
    <BentoCard
      variant="brand"
      hoverable
      onClick={handleClick}
      className="cursor-pointer group relative overflow-hidden"
    >
      {/* Decorative subtle background shapes */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F9CA20]" />
              Trilha Geral do Nível
            </span>
            {isPrepared ? (
              <Badge color="emerald" size="sm" className="font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Preparado para a Prova
              </Badge>
            ) : (
              <span className="text-xs text-white/80 font-medium">
                Em andamento ({progress}%)
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-heading font-black text-white group-hover:text-[#F9CA20] transition-colors">
            {trilhaGeral?.titulo || 'Trilha Geral de Aprendizagem — Nível 2 (8º e 9º Ano)'}
          </h3>

          <p className="text-sm text-white/85 line-clamp-2 leading-relaxed">
            {trilhaGeral?.descricao ||
              'Formação completa cobrindo matemática financeira, noções de mercado, investimentos e planejamento estratégico para a prova da Olimpíada.'}
          </p>

          <div className="pt-2">
            <div className="flex justify-between items-center text-xs text-white/80 mb-1.5">
              <span>Progresso geral na preparação</span>
              <span className="font-bold text-[#F9CA20] text-sm">{progress}%</span>
            </div>
            <ProgressBar value={progress} color="gold" height="h-3" />
          </div>
        </div>

        {/* Action Button Indicator */}
        <div className="flex items-center gap-2 self-start md:self-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all group-hover:translate-x-1 flex-shrink-0">
          <span>{isPrepared ? 'Revisar Trilha' : 'Acessar Trilha'}</span>
          <ArrowRight className="w-4 h-4 text-[#F9CA20]" />
        </div>
      </div>
    </BentoCard>
  );
};
