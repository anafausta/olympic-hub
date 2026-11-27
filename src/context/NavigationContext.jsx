import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([{ label: 'Home', path: '/' }]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isSimuladoRunning, setIsSimuladoRunning] = useState(false);
  const [simuladoExitRequested, setSimuladoExitRequested] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleProtectedNavigation = (e, targetPath) => {
    if (isSimuladoRunning && targetPath !== '/simulado') {
      if (e) e.preventDefault();
      setSimuladoExitRequested(true);
      setMobileMenuOpen(false);
      return false;
    }
    return true;
  };

  return (
    <NavigationContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
        mobileMenuOpen,
        setMobileMenuOpen,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        logoutModalOpen,
        setLogoutModalOpen,
        isSimuladoRunning,
        setIsSimuladoRunning,
        simuladoExitRequested,
        setSimuladoExitRequested,
        handleProtectedNavigation
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
