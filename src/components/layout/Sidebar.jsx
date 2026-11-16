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
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  Trophy
} from 'lucide-react';

export const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, setLogoutModalOpen } = useNavigation();
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
      className={`hidden md:flex flex-col justify-between h-screen fixed left-0 top-0 z-30 bg-[var(--bg-surface)] border-r border-[var(--border-surface)] transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-[80px]' : 'w-[240px]'
      }`}
    >
      {/* Top Header / Logo */}
      <div>
        <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--border-surface)]">
          <NavLink to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7800D6] to-[#F9CA20] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#7800D6]/20">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-heading font-black text-lg tracking-tight text-[var(--text-primary)]">
                  Olympic<span className="text-[#F9CA20]">Hub</span>
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-medium -mt-1 tracking-wider uppercase">
                  Educação Olímpica
                </span>
              </div>
            )}
          </NavLink>

          {/* Collapse/Expand Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
            title={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
            aria-label={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 mt-2">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all select-none group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7800D6] to-[#2E008F] text-white font-semibold shadow-md shadow-[#7800D6]/20'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                }`
              }
              title={sidebarCollapsed ? label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">{label}</span>}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border-surface)] text-[var(--text-primary)] text-xs rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {label}
                </div>
              )}
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
          {!sidebarCollapsed && (
            <span className="text-sm font-medium">
              {isDark ? 'Tema Claro' : 'Tema Escuro'}
            </span>
          )}
        </button>

        {/* Logout Button (RF135) */}
        <button
          onClick={() => setLogoutModalOpen(true)}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[var(--accent-coral)] hover:bg-[var(--accent-coral-bg)] transition-colors cursor-pointer select-none"
          title="Encerrar sessão"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </aside>
  );
};
