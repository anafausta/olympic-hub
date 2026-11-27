import { NavLink } from 'react-router-dom';
import { Home, Users, Compass, FileCheck2, MoreHorizontal } from '../ui/SolarIcon';
import { useNavigation } from '../../context/NavigationContext';

export const BottomTabBar = () => {
  const { setMobileMenuOpen, handleProtectedNavigation } = useNavigation();

  const mainTabs = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/sala', label: 'Sala', icon: Users },
    { to: '/trilhas', label: 'Trilhas', icon: Compass },
    { to: '/simulado', label: 'Simulados', icon: FileCheck2 }
  ];

  return (
    <nav
      aria-label="Navegação móvel"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-16 bg-[var(--bg-surface)]/95 backdrop-blur-md border-t border-[var(--border-surface)] flex items-center justify-around px-2"
    >
      {mainTabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={(e) => handleProtectedNavigation(e, to)}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all select-none ${
              isActive
                ? 'text-[var(--accent-gold)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'bg-[var(--accent-gold-bg)]' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5">{label}</span>
            </>
          )}
        </NavLink>
      ))}

      {/* Button "Mais" */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none"
      >
        <div className="p-1 rounded-xl">
          <MoreHorizontal className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5">Mais</span>
      </button>
    </nav>
  );
};
