import { Link } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useStudent } from '../../context/StudentContext';
import { useNotification } from '../../context/NotificationContext';
import { Avatar } from '../ui/Avatar';
import { Bell, Menu, ChevronRight, Sparkles, Award } from '../ui/SolarIcon';
import { formatXP } from '../../utils/formatters';
import logoRetangular from '../../assets/logo - retangular.png';

export const Topbar = () => {
  const { breadcrumbs, setMobileMenuOpen, sidebarCollapsed, toggleSidebar, handleProtectedNavigation } = useNavigation();
  const { student } = useStudent();
  const { unreadCount, setDrawerOpen } = useNotification();

  return (
    <>
      <header
        className={`h-16 fixed top-0 right-0 z-20 bg-[var(--bg-surface)]/95 backdrop-blur-md border-b border-[var(--border-surface)] flex items-center justify-between px-4 md:px-8 transition-all duration-300 ${
          sidebarCollapsed ? 'md:left-0' : 'md:left-[240px]'
        } left-0`}
      >
        {/* Left Section: Menu Trigger + Breadcrumbs */}
        <div className="flex items-center gap-3">
          {/* Desktop Hamburger Button when sidebar is completely closed */}
          {sidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="hidden md:flex p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
              aria-label="Abrir menu lateral"
              title="Abrir menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Breadcrumbs (RF28, RF78) */}
          <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-1.5 text-sm">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <div key={crumb.path || index} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
                  )}
                  {isLast ? (
                    <span className="font-semibold text-[var(--text-primary)]">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path}
                      onClick={(e) => handleProtectedNavigation(e, crumb.path)}
                      className="text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Brand Logo in Header */}
          <Link
            to="/"
            onClick={(e) => handleProtectedNavigation(e, '/')}
            className="md:hidden flex items-center"
          >
            <img
              src={logoRetangular}
              alt="OlympicHub"
              className="w-auto h-auto max-h-10 max-w-[160px] object-contain"
            />
          </Link>
        </div>

        {/* Right Section: Level Badge + XP Pill + Bell + Avatar */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Grade / Level Badge (RF41) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-cyan-bg)] border border-[var(--accent-cyan)]/30 text-xs font-semibold text-[var(--accent-cyan)]">
            <Award className="w-3.5 h-3.5" />
            <span>Nível {student?.nivel || 2} ({student?.anoEscolar ? '8º/9º Ano' : 'OBEF'})</span>
          </div>

          {/* Gold XP Pill (RF29, RF46) */}
          <Link
            to="/sala"
            onClick={(e) => handleProtectedNavigation(e, '/sala')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-gold-bg)] border border-[var(--accent-gold)]/40 text-xs md:text-sm font-bold text-[var(--accent-gold)] hover:brightness-110 transition-all select-none shadow-sm cursor-pointer"
            title="Pontuação Geral Acumulada"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{formatXP(student?.xp || 0)}</span>
          </Link>

          {/* Notification Bell (RF166, RF168) */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
            aria-label="Abrir notificações"
            title="Notificações"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF4949] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[var(--bg-surface)] animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Student Avatar (RF130) */}
          <Link
            to="/perfil"
            onClick={(e) => handleProtectedNavigation(e, '/perfil')}
            className="flex items-center gap-2.5 group cursor-pointer"
            title="Ver perfil"
          >
            <Avatar avatarId={student?.avatarId || 3} size="sm" className="ring-2 ring-transparent group-hover:ring-[#7800D6] transition-all" />
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-[var(--text-primary)] leading-tight group-hover:text-[#7800D6] transition-colors">
                {student?.nome || 'Aluno'}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">
                {student?.posicaoRanking ? `${student.posicaoRanking}º no ranking` : 'Ver perfil'}
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Mobile Breadcrumb Sub-bar */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-10 bg-[var(--bg-surface)]/90 backdrop-blur-sm border-b border-[var(--border-surface)] px-4 py-2 flex items-center text-xs overflow-x-auto whitespace-nowrap">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <div key={crumb.path || index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3 h-3 text-[var(--text-muted)] flex-shrink-0" />}
              {isLast ? (
                <span className="font-semibold text-[var(--text-primary)] truncate max-w-[180px]">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  onClick={(e) => handleProtectedNavigation(e, crumb.path)}
                  className="text-[var(--text-secondary)]"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
