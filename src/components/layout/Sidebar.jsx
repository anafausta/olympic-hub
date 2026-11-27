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
  ChevronLeft,
  Sun,
  Moon,
  LogOut
} from '../ui/SolarIcon';
import logoRetangular from '../../assets/logo - retangular.png';

export const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, setLogoutModalOpen, handleProtectedNavigation } = useNavigation();
  const { toggleTheme, isDark } = useTheme();

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/sala', label: 'Minha Sala', icon: Users },
    { to: '/trilhas', label: 'Trilhas', icon: Compass },
    { to: '/simulado', label: 'Simulados', icon: FileCheck2 },
    { to: '/minigames', label: 'Minigames', icon: Gamepad2 },
    { to: '/artigos', label: 'Artigos / Wiki', icon: BookOpen },
    { to: '/forum', label: 'Fórum da Sala', icon: MessageSquare },
    { to: '/perfil', label: 'Meu Perfil', icon: User }
  ];

  return (
    <aside
      className={`hidden md:flex flex-col justify-between h-screen fixed left-0 top-0 z-30 w-[240px] bg-[var(--bg-surface)] border-r border-[var(--border-surface)] transition-transform duration-300 ease-in-out ${
        sidebarCollapsed ? '-translate-x-full pointer-events-none' : 'translate-x-0'
      }`}
      aria-hidden={sidebarCollapsed}
    >
      {/* Top Header / Logo */}
      <div>
        <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--border-surface)]">
          <NavLink
            to="/"
            onClick={(e) => handleProtectedNavigation(e, '/')}
            className="flex items-center overflow-hidden"
          >
            <img
              src={logoRetangular}
              alt="OlympicHub"
              className="w-auto h-auto max-h-12 max-w-[175px] object-contain"
            />
          </NavLink>

          {/* Collapse Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
            title="Recolher menu"
            aria-label="Recolher menu"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 mt-2">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={(e) => handleProtectedNavigation(e, to)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all select-none group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7800D6] to-[#2E008F] text-white font-semibold shadow-md shadow-[#7800D6]/20'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Footer Actions (Theme Toggle & Logout) */}
      <div className="p-3 border-t border-[var(--border-surface)] space-y-1">
        {/* Theme Toggle (RF133) */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer select-none"
          title={isDark ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-[#F9CA20] flex-shrink-0" />
          ) : (
            <Moon className="w-5 h-5 text-[#7800D6] flex-shrink-0" />
          )}
          <span className="text-sm font-medium">
            {isDark ? 'Tema Claro' : 'Tema Escuro'}
          </span>
        </button>

        {/* Logout Button (RF135) */}
        <button
          onClick={() => setLogoutModalOpen(true)}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[var(--accent-coral)] hover:bg-[var(--accent-coral-bg)] transition-colors cursor-pointer select-none"
          title="Encerrar sessão"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
};
