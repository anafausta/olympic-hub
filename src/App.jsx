import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { StudentProvider } from './context/StudentContext';
import { NotificationProvider } from './context/NotificationContext';
import { NavigationProvider } from './context/NavigationContext';

// Layout
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { BottomTabBar } from './components/layout/BottomTabBar';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { Toast } from './components/ui/Toast';
import { LogoutModal } from './components/layout/LogoutModal';
import { InactivityModal } from './components/layout/InactivityModal';
import { useInactivityTimer } from './hooks/useInactivityTimer';

// Pages
import { HomePage } from './pages/HomePage';
import { SalaPage } from './pages/SalaPage';
import { TrilhasPage } from './pages/TrilhasPage';
import { ArtigosPage } from './pages/ArtigosPage';
import { ArtigoLeituraPage } from './pages/ArtigoLeituraPage';
import { SimuladoPage } from './pages/SimuladoPage';
import { MinigamesPage } from './pages/MinigamesPage';
import { ForumPage } from './pages/ForumPage';
import { PerfilPage } from './pages/PerfilPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  const [inactivityModalOpen, setInactivityModalOpen] = useState(false);

  // RF135: Inatividade de 10 minutos na versão Web
  const { resetTimer } = useInactivityTimer(() => {
    // Only trigger modal on desktop / wider screens
    if (window.innerWidth >= 768) {
      setInactivityModalOpen(true);
    }
  });

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Desktop Collapsible Sidebar (240px <-> 80px) */}
      <Sidebar />

      {/* Top Navigation Bar with Breadcrumbs & Indicators */}
      <Topbar />

      {/* Main Routed Page Content */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sala" element={<SalaPage />} />
          <Route path="/trilhas" element={<TrilhasPage />} />
          <Route path="/artigos" element={<ArtigosPage />} />
          <Route path="/artigos/:id" element={<ArtigoLeituraPage />} />
          <Route path="/simulado" element={<SimuladoPage />} />
          <Route path="/minigames" element={<MinigamesPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Mobile Bottom Tab Bar (390px) */}
      <BottomTabBar />

      {/* Mobile Drawer (Menu Hamburguer & Mais) */}
      <MobileDrawer />

      {/* Real-time Notifications Drawer (RF166 - RF175) */}
      <NotificationDrawer />

      {/* Global Toast for Alerts & Feedbacks */}
      <Toast />

      {/* RF135: Logout Confirmation Modal */}
      <LogoutModal />

      {/* RF135: Inactivity Timeout Modal */}
      <InactivityModal
        isOpen={inactivityModalOpen}
        onContinue={() => {
          setInactivityModalOpen(false);
          resetTimer();
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <NotificationProvider>
          <NavigationProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </NavigationProvider>
        </NotificationProvider>
      </StudentProvider>
    </ThemeProvider>
  );
}
