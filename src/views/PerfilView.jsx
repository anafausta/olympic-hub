import { PageContainer } from '../components/layout/PageContainer';
import { ProfileInfo } from '../components/perfil/ProfileInfo';
import { PreferencesSection } from '../components/perfil/PreferencesSection';
import { AvatarPickerModal } from '../components/perfil/AvatarPickerModal';
import { EmailEditModal } from '../components/perfil/EmailEditModal';
import { PasswordResetModal } from '../components/perfil/PasswordResetModal';
import { DeleteAccountModal } from '../components/perfil/DeleteAccountModal';
import { BentoCard } from '../components/ui/BentoCard';
import { Button } from '../components/ui/Button';
import { User, KeyRound, Trash2, Shield } from '../components/ui/SolarIcon';

export const PerfilView = ({
  student,
  avatarPickerOpen,
  setAvatarPickerOpen,
  emailEditOpen,
  setEmailEditOpen,
  passwordResetOpen,
  setPasswordResetOpen,
  deleteAccountOpen,
  setDeleteAccountOpen,
  onSaveAvatar,
  onSaveEmail,
  onToggleEmailNotifications,
  onConfirmDeleteAccount
}) => {
  return (
    <PageContainer>
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-1">
          <User className="w-4 h-4" />
          <span>Configurações</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-black text-[var(--text-primary)] tracking-tight">
          Meu Perfil
        </h1>
      </div>

      {/* Main Profile Info (RF129, RF130, RF131) */}
      <ProfileInfo
        student={student}
        onOpenAvatarPicker={() => setAvatarPickerOpen(true)}
        onOpenEmailEdit={() => setEmailEditOpen(true)}
      />

      {/* Preferences Section: Theme (RF133) & Email Notifications (RF169) */}
      <PreferencesSection
        emailNotifications={student?.emailNotificationsEnabled ?? true}
        onToggleEmailNotifications={onToggleEmailNotifications}
      />

      {/* Security & Danger Zone (RF132, RF134) */}
      <BentoCard variant="surface" className="p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--border-surface)] pb-3">
          <Shield className="w-5 h-5 text-[#F9CA20]" />
          <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
            Segurança & Gerenciamento da Conta
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Password Reset (RF132) */}
          <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-surface)] space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[var(--brand-primary)]" />
                Alterar Senha de Acesso
              </span>
              <p className="text-xs text-[var(--text-secondary)]">
                Receba um link seguro no seu e-mail para definir uma nova senha sem necessidade da senha atual.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPasswordResetOpen(true)}
              className="self-start"
            >
              Solicitar redefinição
            </Button>
          </div>

          {/* Account Deletion (RF134) */}
          <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[#FF4949]/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-sm font-bold text-[#FF4949] flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Excluir Conta
              </span>
              <p className="text-xs text-[var(--text-secondary)]">
                Exclusão permanente dos dados, pontos e conquistas, preservando posts no fórum como "Conta excluída".
              </p>
            </div>
            <Button
              variant="coral"
              size="sm"
              onClick={() => setDeleteAccountOpen(true)}
              className="self-start"
            >
              Excluir minha conta
            </Button>
          </div>
        </div>
      </BentoCard>

      {/* Modals */}
      <AvatarPickerModal
        isOpen={avatarPickerOpen}
        onClose={() => setAvatarPickerOpen(false)}
        currentAvatarId={student?.avatarId || 3}
        onSaveAvatar={onSaveAvatar}
      />

      <EmailEditModal
        isOpen={emailEditOpen}
        onClose={() => setEmailEditOpen(false)}
        currentEmail={student?.email}
        onSaveEmail={onSaveEmail}
      />

      <PasswordResetModal
        isOpen={passwordResetOpen}
        onClose={() => setPasswordResetOpen(false)}
        studentEmail={student?.email}
      />

      <DeleteAccountModal
        isOpen={deleteAccountOpen}
        onClose={() => setDeleteAccountOpen(false)}
        onConfirmDelete={onConfirmDeleteAccount}
      />
    </PageContainer>
  );
};
