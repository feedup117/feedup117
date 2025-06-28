import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import HomePage from './pages/HomePage';
import TryDemoPage from './pages/TryDemoPage';
import ScanOrderPage from './pages/ScanOrderPage';
import WaitingPage from './pages/WaitingPage';
import PaymentPage from './pages/PaymentPage';
import ThankYouPage from './pages/ThankYouPage';
import LoginPage from './pages/LoginPage';
import PartnerRegister from './pages/partner/register';
import PartnerDashboard from './pages/partner/Dashboard';
import PartnerMenu from './pages/partner/Menu';
import PartnerTables from './pages/partner/Tables';
import PartnerOrders from './pages/partner/Orders';
import PartnerAnalytics from './pages/partner/Analytics';
import PartnerSettings from './pages/partner/Settings';
import PartnerStaff from './pages/partner/staff';
import PartnerPOS from './pages/partner/POS';
import PartnerCRM from './pages/partner/CRM';
import PartnerSubscription from './pages/partner/Subscription';
import PartnerWebhookTester from './pages/partner/integrations/WebhookTester';
import ManagerDashboard from './pages/manager/Dashboard';
import ManagerMenu from './pages/manager/Menu';
import ManagerTables from './pages/manager/Tables';
import ManagerOrders from './pages/manager/Orders';
import ManagerStaff from './pages/manager/Staff';
import KitchenOrders from './pages/kitchen/Orders';
import ServantOrders from './pages/servant/Orders';
import ServantTips from './pages/servant/Tips';
import ServantRequests from './pages/servant/Requests';
import ServantFeedback from './pages/servant/Feedback';
import ServantTipsHistory from './pages/servant/TipsHistory';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPartnerDirectory from './pages/admin/PartnerDirectory';
import AdminApprovals from './pages/admin/approvals';
import AdminSubscriptions from './pages/admin/Subscriptions';
import AdminAddOns from './pages/admin/AddOns';
import AdminFeedbackOverview from './pages/admin/FeedbackOverview';
import AdminFeatureFlags from './pages/admin/FeatureFlags';
import AdminDemoManager from './pages/admin/DemoManager';
import AdminAuditLogs from './pages/admin/AuditLogs';
import AdminSettings from './pages/admin/Settings';
import AdminWebhookTester from './pages/admin/WebhookTester';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/try-demo" element={<TryDemoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/partner/register" element={<PartnerRegister />} />
            <Route path="/scan/:tableId" element={<ScanOrderPage />} />
            <Route path="/waiting" element={<WaitingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            
            {/* Partner Dashboard Routes */}
            <Route path="/partner/dashboard" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'dashboard', permission: 'write' }}>
                <PartnerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/partner/menu" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'menu', permission: 'write' }}>
                <PartnerMenu />
              </ProtectedRoute>
            } />
            <Route path="/partner/tables" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'tables', permission: 'write' }}>
                <PartnerTables />
              </ProtectedRoute>
            } />
            <Route path="/partner/orders" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'orders', permission: 'write' }}>
                <PartnerOrders />
              </ProtectedRoute>
            } />
            <Route path="/partner/analytics" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'analytics', permission: 'write' }}>
                <PartnerAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/partner/settings" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'branding', permission: 'write' }}>
                <PartnerSettings />
              </ProtectedRoute>
            } />
            <Route path="/partner/staff" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'staff', permission: 'write' }}>
                <PartnerStaff />
              </ProtectedRoute>
            } />
            <Route path="/partner/pos" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'pos', permission: 'write' }}>
                <PartnerPOS />
              </ProtectedRoute>
            } />
            <Route path="/partner/crm" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'crm', permission: 'write' }}>
                <PartnerCRM />
              </ProtectedRoute>
            } />
            <Route path="/partner/subscription" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'subscription', permission: 'limited' }}>
                <PartnerSubscription />
              </ProtectedRoute>
            } />
            <Route path="/partner/integrations/webhook-tester" element={
              <ProtectedRoute requiredRole={['partner']} requiredPermission={{ feature: 'dashboard', permission: 'write' }}>
                <PartnerWebhookTester />
              </ProtectedRoute>
            } />
            
            {/* Manager Dashboard Routes */}
            <Route path="/manager/dashboard" element={
              <ProtectedRoute requiredRole={['manager']} requiredPermission={{ feature: 'dashboard', permission: 'limited' }}>
                <ManagerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/manager/menu" element={
              <ProtectedRoute requiredRole={['manager']} requiredPermission={{ feature: 'menu', permission: 'limited' }}>
                <ManagerMenu />
              </ProtectedRoute>
            } />
            <Route path="/manager/tables" element={
              <ProtectedRoute requiredRole={['manager']} requiredPermission={{ feature: 'tables', permission: 'limited' }}>
                <ManagerTables />
              </ProtectedRoute>
            } />
            <Route path="/manager/orders" element={
              <ProtectedRoute requiredRole={['manager']} requiredPermission={{ feature: 'orders', permission: 'write' }}>
                <ManagerOrders />
              </ProtectedRoute>
            } />
            <Route path="/manager/staff" element={
              <ProtectedRoute requiredRole={['manager']} requiredPermission={{ feature: 'staff', permission: 'read' }}>
                <ManagerStaff />
              </ProtectedRoute>
            } />
            
            {/* Kitchen Dashboard Routes */}
            <Route path="/kitchen/orders" element={
              <ProtectedRoute requiredRole={['kitchen']} requiredPermission={{ feature: 'kitchen', permission: 'write' }}>
                <KitchenOrders />
              </ProtectedRoute>
            } />
            
            {/* Servant Dashboard Routes */}
            <Route path="/servant/orders" element={
              <ProtectedRoute requiredRole={['servant']} requiredPermission={{ feature: 'orders', permission: 'limited' }}>
                <ServantOrders />
              </ProtectedRoute>
            } />
            <Route path="/servant/tips" element={
              <ProtectedRoute requiredRole={['servant']} requiredPermission={{ feature: 'tipManagement', permission: 'write' }}>
                <ServantTips />
              </ProtectedRoute>
            } />
            <Route path="/servant/requests" element={
              <ProtectedRoute requiredRole={['servant']} requiredPermission={{ feature: 'requests', permission: 'write' }}>
                <ServantRequests />
              </ProtectedRoute>
            } />
            <Route path="/servant/feedback" element={
              <ProtectedRoute requiredRole={['servant']} requiredPermission={{ feature: 'feedback', permission: 'limited' }}>
                <ServantFeedback />
              </ProtectedRoute>
            } />
            <Route path="/servant/tips-history" element={
              <ProtectedRoute requiredRole={['servant']} requiredPermission={{ feature: 'tipReports', permission: 'limited' }}>
                <ServantTipsHistory />
              </ProtectedRoute>
            } />
            
            {/* Admin Dashboard Routes */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/partners" element={<AdminPartnerDirectory />} />
              <Route path="/admin/approvals" element={<AdminApprovals />} />
              <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
              <Route path="/admin/addons" element={<AdminAddOns />} />
              <Route path="/admin/feedback" element={<AdminFeedbackOverview />} />
              <Route path="/admin/features" element={<AdminFeatureFlags />} />
              <Route path="/admin/demo" element={<AdminDemoManager />} />
              <Route path="/admin/logs" element={<AdminAuditLogs />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/webhook-tester" element={<AdminWebhookTester />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;