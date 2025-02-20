import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationGuardProvider } from './components/NavigationGuard';
import gradientStyles from './styles/GradientBackground.module.css';
import './styles/TremorOverrides.css';

// Import pages
import Dashboard from './pages/Dashboard';
import AnalyticsOverview from './pages/Analytics/AnalyticsOverview';
import AnalyticsTraffic from './pages/Analytics/AnalyticsTraffic';
import BillingInvoices from './pages/Billing/BillingInvoices';
import BillingPayments from './pages/Billing/BillingPayments';
import Account from './pages/Account/Accounts';
import Support from './pages/Support/Support';
import Settings from './pages/Settings/Settings';
import ClientsList from './pages/Clients/ClientsList';
import ClientDetails from './pages/Clients/ClientDetails';
import ClientForm from './pages/Clients/ClientForm';
import PlatformsOverview from './pages/Platforms/PlatformsOverview'; // new import

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Animated gradient background */}
      <div className={gradientStyles.gradientBackground} />

      {/* Content with glass effect */}
      <div className={gradientStyles.glassContent}>
        <Routes>
          <Route path="/*" element={
            <div className="flex min-h-screen relative">
              <aside className="hidden md:block w-72 relative z-10">
                <div className="fixed top-0 bottom-0 w-72">
                  <Sidebar isOpen={true} onClose={() => {}} />
                </div>
              </aside>

              {sidebarOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                  <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                  />
                  <div className="relative w-72 h-full">
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                  </div>
                </div>
              )}

              <main className="flex-1 relative z-10">
                <TopNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <div className="p-4 md:p-6">
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="analytics/overview" element={<AnalyticsOverview />} />
                    <Route path="analytics/traffic" element={<AnalyticsTraffic />} />
                    <Route path="support" element={<Support />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="platforms" element={<PlatformsOverview />} />
                    <Route path="clients" element={<ClientsList />} />
                    <Route path="clients/new" element={<ClientForm />} />
                    <Route path="clients/:id" element={<ClientDetails />} />
                    <Route path="billing/invoices" element={<BillingInvoices />} />
                    <Route path="billing/payments" element={<BillingPayments />} />
                    <Route path="account" element={<Account />} />
                  </Routes>
                </div>
              </main>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <NavigationGuardProvider>
          <Toaster position="top-right" toastOptions={{
            className: 'rounded-xl shadow-lg glass-morphism',
            duration: 4000,
          }} />
          <AppContent />
        </NavigationGuardProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
