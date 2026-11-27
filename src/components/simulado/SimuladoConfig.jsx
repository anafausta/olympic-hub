import { useState } from 'react';
import { BentoCard } from '../ui/BentoCard';
import { Button } from '../ui/Button';
import {
  FileCheck2,
  Clock,
  Sparkles,
  Check,
  AlertCircle
} from '../ui/SolarIcon';

const QUANTITY_OPTIONS = [1, 5, 10, 15, 20]; // RF50: Restringindo-se a 1, 5, 10, 15, 20 questões

export const SimuladoConfig = ({
  availableSubjects = [],
  studentLevel = 2,
  onStartSimulado
}) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(5); // Default to 5
  const [timedMode, setTimedMode] = useState(false); // RF51: Com tempo vs Sem tempo

  const toggleSubject = (subj) => {
    setSelectedSubjects((prev) =>
      prev.includes(subj) ? prev.filter((s) => s !== subj) : [...prev, subj]
    );
  };

  const handleSelectAllSubjects = () => {
    if (selectedSubjects.length === availableSubjects.length) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects([...availableSubjects]);
    }
  };

  const handleStart = () => {
    onStartSimulado({
      assuntos: selectedSubjects.length > 0 ? selectedSubjects : availableSubjects,
      quantidade: selectedQuantity,
      comTempo: timedMode,
      nivel: studentLevel
    });
  };

  // RF51: 5 minutes per question pré-calculado
  const calculatedMinutes = selectedQuantity * 5;

  return (
    <BentoCard variant="surface" className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b border-[var(--border-surface)] pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] flex items-center justify-center">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-black text-[var(--text-primary)]">
              Configurar Simulado
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Personalize os temas e a quantidade de questões.
            </p>
          </div>
        </div>


      </div>

      {/* 1. Assuntos (RF49) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            1. Assuntos da Prova
          </label>
          <button
            type="button"
            onClick={handleSelectAllSubjects}
            className="text-xs text-[var(--brand-primary)] hover:underline font-semibold cursor-pointer"
          >
            {selectedSubjects.length === availableSubjects.length ? 'Desmarcar todos' : 'Selecionar todos'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {availableSubjects.map((subject) => {
            const isSelected = selectedSubjects.includes(subject);
            return (
              <button
                key={subject}
                type="button"
                onClick={() => toggleSubject(subject)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#7800D6] to-[#2E008F] text-white border-[#7800D6] shadow-sm'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-surface)] hover:text-[var(--text-primary)]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{subject}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Quantidade de Questões (RF50: restrita a 1, 5, 10, 15, 20) */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          2. Quantidade de Questões
        </label>
        <div className="grid grid-cols-5 gap-2">
          {QUANTITY_OPTIONS.map((qty) => {
            const isSelected = selectedQuantity === qty;
            return (
              <button
                key={qty}
                type="button"
                onClick={() => setSelectedQuantity(qty)}
                className={`py-3 rounded-xl border text-center font-heading font-black text-sm md:text-base transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#F9CA20] text-[#1A103C] border-[#F9CA20] shadow-md shadow-[#F9CA20]/20'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-surface)] hover:border-[var(--brand-primary)]'
                }`}
              >
                {qty} {qty === 1 ? 'questão' : 'questões'}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Tempo de Prova (RF51: Com tempo vs Sem tempo) */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          3. Modalidade de Tempo
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTimedMode(false)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              !timedMode
                ? 'bg-gradient-to-r from-[#7800D6]/20 to-transparent border-[#7800D6]'
                : 'bg-[var(--bg-elevated)] border-[var(--border-surface)]'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#F9CA20]" />
              <span className="font-bold text-sm text-[var(--text-primary)]">Com cronômetro</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTimedMode(true)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              timedMode
                ? 'bg-gradient-to-r from-[#7800D6]/20 to-transparent border-[#7800D6]'
                : 'bg-[var(--bg-elevated)] border-[var(--border-surface)]'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-[#FF4949]" />
              <span className="font-bold text-sm text-[var(--text-primary)]">
                Sem cronômetro
              </span>
            </div>

          </button>
        </div>
      </div>

      {/* Action to Start */}
      <div className="pt-4 border-t border-[var(--border-surface)] flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={handleStart}
          className="w-full sm:w-auto font-black shadow-lg"
        >
          Iniciar Simulado
        </Button>
      </div>
    </BentoCard>
  );
};
