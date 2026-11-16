import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AVATAR_PRESETS } from '../../services/alunoService';
import { Check } from 'lucide-react';

export const AvatarPickerModal = ({
  isOpen,
  onClose,
  currentAvatarId,
  onSaveAvatar
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Escolha seu Avatar"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <p className="text-xs text-[var(--text-secondary)]">
          Selecione um dos 10 avatares oficiais da plataforma. O upload de fotos é bloqueado para proteção e privacidade escolar.
        </p>

        {/* 10 Pre-defined Avatars (RF130) */}
        <div className="grid grid-cols-5 gap-3 py-2">
          {AVATAR_PRESETS.map((preset) => {
            const isSelected = currentAvatarId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  onSaveAvatar(preset.id);
                  onClose();
                }}
                className={`p-2 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-[#F9CA20] ring-2 ring-[#F9CA20] bg-[var(--bg-elevated)] scale-105'
                    : 'border-[var(--border-surface)] bg-[var(--bg-elevated)] hover:border-[var(--brand-primary)]'
                }`}
                title={preset.label}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shadow-sm"
                  style={{ backgroundColor: preset.bg }}
                >
                  {preset.emoji}
                </div>
                <span className="text-[10px] text-[var(--text-secondary)] mt-1 truncate max-w-full">
                  {preset.label.split(' ')[0]}
                </span>
                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#F9CA20] text-[#1A103C] flex items-center justify-center text-[10px] font-black">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end pt-2 border-t border-[var(--border-surface)]">
          <Button variant="outline" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
