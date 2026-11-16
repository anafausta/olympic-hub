import { BentoCard } from '../ui/BentoCard';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Bell, Sliders } from 'lucide-react';

export const PreferencesSection = ({
  emailNotifications,
  onToggleEmailNotifications
}) => {
  const { setTheme, isDark } = useTheme();

  return (
    <BentoCard variant="surface" className="p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-2 border-b border-[var(--border-surface)] pb-3">
        <Sliders className="w-5 h-5 text-[var(--accent-cyan)]" />
        <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
          Preferências e Configurações da Conta
        </h4>
      </div>

      <div className="space-y-4">
        {/* RF133: Tema Claro e Escuro (Sem opção de alterar tamanho da fonte) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)]">
          <div className="space-y-0.5">
            <span className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              {isDark ? <Moon className="w-4 h-4 text-[#7800D6]" /> : <Sun className="w-4 h-4 text-[#F9CA20]" />}
              Aparência da Plataforma
            </span>
            <p className="text-xs text-[var(--text-secondary)]">
              Alterne entre Tema Escuro (padrão) e Tema Claro para conforto visual.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-surface)]'
              }`}
            >
              Tema Escuro
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                !isDark
                  ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-surface)]'
              }`}
            >
              Tema Claro
            </button>
          </div>
        </div>

        {/* RF169: Envio por E-mail (Opcional) */}
        <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)]">
          <div className="space-y-0.5">
            <span className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[var(--accent-lilac)]" />
              Notificações por E-mail
            </span>
            <p className="text-xs text-[var(--text-secondary)]">
              Receba avisos de novos simulados e respostas no fórum na sua caixa de correio.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => onToggleEmailNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[var(--border-surface)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
          </label>
        </div>
      </div>
    </BentoCard>
  );
};
