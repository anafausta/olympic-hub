import { useState } from 'react';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import {
  TrendingUp,
  ShieldAlert,
  Smile,
  Users,
  CheckCircle2,
  RotateCcw,
  ArrowLeft,
  Sparkles
} from '../ui/SolarIcon';

// RF158: Clientes com idade, renda e objetivo, escolhas binárias
const CLIENTS = [
  {
    nome: 'Dona Maria (68 anos)',
    perfil: 'Aposentada • Renda: R$ 2.500 • Meta: Preservação de Capital para Remédios',
    situacao: 'Desejo guardar meu dinheiro onde não haja risco de perder nada.',
    opcaoA: {
      titulo: 'Poupança Tradicional',
      lucroDelta: +5,
      riscoDelta: -10,
      satisfacaoDelta: +15,
      preview: 'Lucro baixo, Risco quase nulo, Alta satisfação'
    },
    opcaoB: {
      titulo: 'Fundo Multimercado com Ações',
      lucroDelta: +25,
      riscoDelta: +30,
      satisfacaoDelta: -25,
      preview: 'Alto risco, Lucro potencial alto, Baixa satisfação da idosa'
    }
  },
  {
    nome: 'Pedro (19 anos)',
    perfil: 'Estudante Universitário • Renda: Estágio R$ 1.200 • Meta: Comprar um notebook em 1 ano',
    situacao: 'Preciso de rendimento acima da inflação mas posso resgatar se precisar.',
    opcaoA: {
      titulo: 'CDB com 100% do CDI e Liquidez Diária',
      lucroDelta: +15,
      riscoDelta: +5,
      satisfacaoDelta: +20,
      preview: 'Equilibrado e seguro para curto prazo'
    },
    opcaoB: {
      titulo: 'Criptomoedas de Alta Volatilidade',
      lucroDelta: +35,
      riscoDelta: +40,
      satisfacaoDelta: -20,
      preview: 'Risco extremo para quem precisa do dinheiro em 1 ano'
    }
  },
  {
    nome: 'Carla e Marcelo (35 anos)',
    perfil: 'Casal de Engenheiros • Renda: R$ 14.000 • Meta: Aposentadoria em 25 anos',
    situacao: 'Temos horizonte de longo prazo e buscamos ganho real expressivo acima da inflação.',
    opcaoA: {
      titulo: 'Tesouro IPCA+ com juros semestrais',
      lucroDelta: +20,
      riscoDelta: +10,
      satisfacaoDelta: +20,
      preview: 'Proteção contra inflação no longo prazo'
    },
    opcaoB: {
      titulo: 'Deixar tudo parado na Conta Corrente',
      lucroDelta: -10,
      riscoDelta: 0,
      satisfacaoDelta: -30,
      preview: 'Perda constante de poder de compra pela inflação'
    }
  },
  {
    nome: 'Seu Joaquim (55 anos)',
    perfil: 'Comerciante • Renda: R$ 8.000 • Meta: Reserva de Emergência para o comércio',
    situacao: 'Posso precisar do dinheiro a qualquer momento para repor estoque em crise.',
    opcaoA: {
      titulo: 'Tesouro Selic',
      lucroDelta: +12,
      riscoDelta: +2,
      satisfacaoDelta: +20,
      preview: 'Segurança soberana e resgate ágil'
    },
    opcaoB: {
      titulo: 'LCA com carência de 3 anos',
      lucroDelta: +18,
      riscoDelta: +5,
      satisfacaoDelta: -25,
      preview: 'Dinheiro preso, sem liquidez para emergências'
    }
  },
  {
    nome: 'Juliana (28 anos)',
    perfil: 'Arquiteta • Renda: R$ 6.000 • Meta: Entrada da Casa Própria em 3 anos',
    situacao: 'Quero previsibilidade exata do valor que vou receber no vencimento.',
    opcaoA: {
      titulo: 'CDB Prefixado',
      lucroDelta: +15,
      riscoDelta: +5,
      satisfacaoDelta: +20,
      preview: 'Taxa fixa combinada e garantia do FGC'
    },
    opcaoB: {
      titulo: 'Ações de Startups Pré-operacionais',
      lucroDelta: +30,
      riscoDelta: +35,
      satisfacaoDelta: -20,
      preview: 'Incompatível com prazo curto de compra de imóvel'
    }
  }
];

export const GerenteBanco = ({ onWin, onBack }) => {
  const [clientIndex, setClientIndex] = useState(0);
  const [lucro, setLucro] = useState(50);
  const [risco, setRisco] = useState(30);
  const [satisfacao, setSatisfacao] = useState(60);
  const [clientCount, setClientCount] = useState(10); // Active client portfolio
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const client = CLIENTS[clientIndex];

  const handleDecision = (opcao) => {
    if (isGameOver) return;

    const nextLucro = Math.min(100, Math.max(0, lucro + opcao.lucroDelta));
    const nextRisco = Math.min(100, Math.max(0, risco + opcao.riscoDelta));
    const nextSatisfacao = Math.min(100, Math.max(0, satisfacao + opcao.satisfacaoDelta));

    let nextClients = clientCount;
    // RF158: Clientes satisfeitos recomendam novos, insatisfeitos deixam carteira
    if (opcao.satisfacaoDelta > 0) {
      nextClients += 2;
    } else {
      nextClients -= 3;
    }

    setLucro(nextLucro);
    setRisco(nextRisco);
    setSatisfacao(nextSatisfacao);
    setClientCount(Math.max(0, nextClients));

    // Check defeat (RF158: Derrota caso perca todos os clientes ou satisfação zere)
    if (nextClients <= 0 || nextSatisfacao <= 0) {
      setIsGameOver(true);
      setWon(false);
      return;
    }

    // Check next client or win
    if (clientIndex + 1 < CLIENTS.length) {
      setClientIndex((prev) => prev + 1);
    } else {
      // Victory
      setIsGameOver(true);
      setWon(true);
      onWin(); // +5 XP (RF82)
    }
  };

  const handleRestart = () => {
    setClientIndex(0);
    setLucro(50);
    setRisco(30);
    setSatisfacao(60);
    setClientCount(10);
    setIsGameOver(false);
    setWon(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar aos Minigames</span>
        </button>

        <Badge color="gold" size="sm">
          <Sparkles className="w-3.5 h-3.5" /> Recompensa: +5 XP
        </Badge>
      </div>

      <BentoCard variant="surface" className="p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-heading font-black text-[var(--text-primary)]">
            Gerente de Banco — Estilo Reigns
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Tome decisões binárias equilibrando Lucro, Risco e Satisfação dos clientes da sua carteira.
          </p>
        </div>

        {/* 3 Balanced Factors (Lucro, Risco, Satisfação) + Carteira de Clientes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)]">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1 font-bold text-[#10B981]">
                <TrendingUp className="w-3.5 h-3.5" /> Lucro
              </span>
              <span>{lucro}%</span>
            </div>
            <ProgressBar value={lucro} color="emerald" height="h-2" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1 font-bold text-[#FF4949]">
                <ShieldAlert className="w-3.5 h-3.5" /> Risco
              </span>
              <span>{risco}%</span>
            </div>
            <ProgressBar value={risco} color="coral" height="h-2" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1 font-bold text-[var(--accent-cyan)]">
                <Smile className="w-3.5 h-3.5" /> Satisfação
              </span>
              <span>{satisfacao}%</span>
            </div>
            <ProgressBar value={satisfacao} color="cyan" height="h-2" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1 font-bold text-[#F9CA20]">
                <Users className="w-3.5 h-3.5" /> Carteira
              </span>
              <span>{clientCount}</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] block">Clientes Ativos</span>
          </div>
        </div>

        {/* Client Profile Card */}
        {!isGameOver && client && (
          <div className="p-5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider">
                  Cliente {clientIndex + 1} de {CLIENTS.length}
                </span>
                <h4 className="text-base font-heading font-black text-[var(--text-primary)]">
                  {client.nome}
                </h4>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] font-medium bg-[var(--bg-surface)] p-2.5 rounded-xl border border-[var(--border-surface)]">
              {client.perfil}
            </p>

            <blockquote className="text-sm font-semibold text-[var(--text-primary)] italic border-l-2 border-[#F9CA20] pl-3 py-1">
              "{client.situacao}"
            </blockquote>

            {/* Binary Choice Options (RF158) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleDecision(client.opcaoA)}
                className="p-4 rounded-xl border border-[var(--border-surface)] bg-[var(--bg-surface)] hover:border-[var(--brand-primary)] hover:bg-[var(--bg-card-hover)] text-left space-y-1.5 transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider">
                  Opção A
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)]">
                  {client.opcaoA.titulo}
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  {client.opcaoA.preview}
                </div>
              </button>

              <button
                onClick={() => handleDecision(client.opcaoB)}
                className="p-4 rounded-xl border border-[var(--border-surface)] bg-[var(--bg-surface)] hover:border-[var(--brand-primary)] hover:bg-[var(--bg-card-hover)] text-left space-y-1.5 transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-[var(--accent-cyan)] uppercase tracking-wider">
                  Opção B
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)]">
                  {client.opcaoB.titulo}
                </div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  {client.opcaoB.preview}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Game Over Banner */}
        {isGameOver && (
          <div className="p-5 rounded-2xl border text-center space-y-3 bg-[var(--bg-elevated)]">
            {won ? (
              <div className="text-[#10B981] font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Excelente gestão financeira! Você atendeu a carteira e conquistou +5 XP!</span>
              </div>
            ) : (
              <div className="text-[#FF4949] font-bold text-sm">
                Sua carteira de clientes foi perdida devido a decisões inadequadas de risco/satisfação!
              </div>
            )}
            <Button variant="primary" size="sm" onClick={handleRestart} className="gap-2 mx-auto">
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Novamente</span>
            </Button>
          </div>
        )}
      </BentoCard>
    </div>
  );
};
