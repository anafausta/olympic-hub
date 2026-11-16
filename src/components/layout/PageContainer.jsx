import { useNavigation } from '../../context/NavigationContext';

export const PageContainer = ({ children, className = '' }) => {
  const { sidebarCollapsed } = useNavigation();

  return (
    <div
      className={`min-h-screen pt-24 md:pt-20 pb-24 md:pb-12 px-4 md:px-8 transition-all duration-300 ${
        sidebarCollapsed ? 'md:ml-[80px]' : 'md:ml-[240px]'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {children}
      </div>
    </div>
  );
};
