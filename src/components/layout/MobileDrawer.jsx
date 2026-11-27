import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Home,
  Users,
  Compass,
  FileCheck2,
  Gamepad2,
  BookOpen,
  MessageSquare,
  User,
  X,
  Sun,
  Moon,
  LogOut
} from '../ui/SolarIcon';
import logoRetangular from '../../assets/logo - retangular.png';

export const MobileDrawer = () => {
  const { mobileMenuOpen, setMobileMenuOpen, setLogoutModalOpen, handleProtectedNavigation } = useNavigation();
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  if (!mobileMenuOpen) return null;

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/sala', label: 'Minha Sala', icon: Users },
    { to: '/trilhas', label: 'Trilhas de Aprendizagem', icon: Compass },
    { to: '/simulado', label: 'Simulados e Questões', icon: FileCheck2 },
    { to: '/minigames', label: 'Minigames Olímpicos', icon: Gamepad2 },
    { to: '/artigos', label: 'Artigos / Wiki', icon: BookOpen },
    { to: '/forum', label: 'Fórum da Sala', icon: MessageSquare },
    { to: '/perfil', label: 'Meu Perfil e Configurações', icon: User }
  ];

  return (
    <div className="md:hidden fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer Box */}
      <div className="relative w-[300px] max-w-[85%] h-full bg-[var(--bg-surface)] border-r border-[var(--border-surface)] shadow-2xl flex flex-col justify-between p-4 z-10 animate-in slide-in-from-left duration-250">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-surface)]">
            <img
              src={logoRetangular}
              alt="OlympicHub"
              className="w-auto h-auto max-h-11 max-w-[190px] object-contain"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-4 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={(e) => {
                  if (handleProtectedNavigation(e, to)) {
                    setMobileMenuOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all text-sm font-medium ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7800D6] to-[#2E008F] text-white font-semibold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border-surface)] pt-4 space-y-2">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-[#F9CA20]" />
            ) : (
              <Moon className="w-5 h-5 text-[#7800D6]" />
            )}
            <span>{isDark ? 'Tema Claro' : 'Tema Escuro'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setLogoutModalOpen(true);
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[var(--accent-coral)] hover:bg-[var(--accent-coral-bg)]"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair da conta</span>
          </button>
        </div>
      </div>
    </div>
  );
};
