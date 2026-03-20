import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import Waitlist from './pages/Waitlist';
import Availability from './pages/Availability';
import AddTimeBlock from './pages/AddTimeBlock';
import BookingSettings from './pages/BookingSettings';
import Patients from './pages/Patients';
import AddPatient from './pages/AddPatient';
import PatientProfile from './pages/PatientProfile';
import VisitHistory from './pages/VisitHistory';
import Referrals from './pages/Referrals';
import AddReferral from './pages/AddReferral';
import Insurance from './pages/Insurance';
import AddInsurance from './pages/AddInsurance';
import LinkProvider from './pages/LinkProvider';
import ClinicalNotes from './pages/ClinicalNotes';
import NewNote from './pages/NewNote';
import SOAPNotePage from './pages/SOAPNotePage';
import RMDQAssessment from './pages/RMDQAssessment';
import IntakeAssessment from './pages/IntakeAssessment';
import HomeExercises from './pages/HomeExercises';
import TreatmentPlan from './pages/TreatmentPlan';
import PatientSurvey from './pages/PatientSurvey';
import NewClaimPage from './pages/NewClaimPage';
import DischargeSummary from './pages/DischargeSummary';
import NoteTemplates from './pages/NoteTemplates';
import Attachments from './pages/Attachments';
import Communication from './pages/Communication';
import SMSChat from './pages/SMSChat';
import EmailMessages from './pages/EmailMessages';
import BulkMessaging from './pages/BulkMessaging';
const Telehealth = lazy(() => import('./pages/Telehealth'));
import CommTemplates from './pages/CommTemplates';
import Billing from './pages/Billing';
import NewInvoice from './pages/NewInvoice';
import Payments from './pages/Payments';
import InsuranceClaims from './pages/InsuranceClaims';
const PaymentReminders = lazy(() => import('./pages/PaymentReminders'));
const PricingServices = lazy(() => import('./pages/PricingServices'));
import FormBuilder from './pages/FormBuilder';
const FormConsent = lazy(() => import('./pages/FormConsent'));
const HealthHistory = lazy(() => import('./pages/HealthHistory'));
const Assessments = lazy(() => import('./pages/Assessments'));
const Analytics = lazy(() => import('./pages/Analytics'));
const RevenueReports = lazy(() => import('./pages/RevenueReports'));
const PatientGrowth = lazy(() => import('./pages/PatientGrowth'));
const ServicePopularity = lazy(() => import('./pages/ServicePopularity'));
import Marketing from './pages/Marketing';
import MarketingSegments from './pages/MarketingSegments';
import MarketingAutomation from './pages/MarketingAutomation';
import MarketingAnalytics from './pages/MarketingAnalytics';
import Integrations from './pages/Integrations';
import IntegrationService from './pages/IntegrationService';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import UserAudit from './pages/UserAudit';
import RolesPermissions from './pages/RolesPermissions';
import AddRole from './pages/AddRole';
import ClinicDetails from './pages/ClinicDetails';
import NotificationSettings from './pages/NotificationSettings';
import StaffPerformance from './pages/StaffPerformance';
import MultiLocation from './pages/MultiLocation';
import SecuritySettings from './pages/SecuritySettings';
const DataBackup = lazy(() => import('./pages/DataBackup'));
const ClinicManual = lazy(() => import('./pages/ClinicManual'));
const ClientsInsurers = lazy(() => import('./pages/ClientsInsurers'));
import RegisterClient from './pages/RegisterClient';
import ViewNote from './pages/ViewNote';
import CreateTemplate from './pages/CreateTemplate';
import RecordPaymentPage from './pages/RecordPaymentPage';
import InvoiceDetailPage from './pages/InvoiceDetailPage';
import SubmitBatchPage from './pages/SubmitBatchPage';
import ClaimDetailPage from './pages/ClaimDetailPage';
import AddReminderRulePage from './pages/AddReminderRulePage';
import AddServicePage from './pages/AddServicePage';
import EditServicePage from './pages/EditServicePage';

const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-500">
    <div className="w-24 h-24 bg-clinicLight rounded-full flex items-center justify-center mb-6">
      <div className="w-12 h-12 border-4 border-clinicPrimary border-t-transparent rounded-full animate-spin"></div>
    </div>
    <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
    <p className="text-gray-500 max-w-md">We're currently building this module to provide you with the best clinic management experience. Please check back shortly.</p>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('deephysio_auth') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('deephysio_role') || 'admin';
  });

  const handleLogin = (role = 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('deephysio_auth', 'true');
    localStorage.setItem('deephysio_role', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('admin');
    localStorage.removeItem('deephysio_auth');
    localStorage.removeItem('deephysio_role');
  };

  const roleMenuAccess = {
    admin: ['Dashboard', 'Appointments', 'Patients', 'Clinical Notes', 'Communication', 'Billing & Payments', 'Forms', 'Analytics', 'Marketing', 'Integrations', 'Settings'],
    therapist: ['Dashboard', 'Appointments', 'Patients', 'Clinical Notes', 'Forms', 'Communication'],
    receptionist: ['Dashboard', 'Appointments', 'Patients', 'Forms', 'Communication', 'Billing & Payments'],
    billing: ['Dashboard', 'Patients', 'Billing & Payments', 'Analytics']
  };

  const hasAccess = (menuName, subItemName = null) => {
    if (!(roleMenuAccess[userRole] || []).includes(menuName)) return false;
    
    if (userRole === 'receptionist' && menuName === 'Billing & Payments') {
      if (subItemName && !['Invoices', 'New Invoice'].includes(subItemName)) return false;
    }
    return true;
  };

  return (
    <Router>
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-clinicLight">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-clinicPrimary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-clinicPrimary font-bold animate-pulse text-lg">DeePhysio</p>
          </div>
        </div>
      }>
        <Routes>
          {!isAuthenticated ? (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          ) : (
            <Route path="/" element={<MainLayout onLogout={handleLogout} userRole={userRole} setUserRole={setUserRole} />}>
              <Route index element={<Dashboard />} />
              
              {/* Appointments - 5 Pages */}
              <Route path="appointments" element={<Appointments />} />
              <Route path="appointments/book" element={<BookAppointment />} />
              <Route path="appointments/waitlist" element={<Waitlist />} />
              <Route path="appointments/availability" element={<Availability />} />
              <Route path="appointments/availability/add" element={<AddTimeBlock />} />
              <Route path="appointments/settings" element={<BookingSettings />} />

              {/* Patients - 6 Pages */}
              <Route path="patients" element={<Patients />} />
              <Route path="patients/add" element={<AddPatient />} />
              <Route path="patients/profile/:id" element={<PatientProfile />} />
              <Route path="patients/history/:id" element={<VisitHistory />} />
              <Route path="patients/referrals" element={<Referrals />} />
              <Route path="patients/referrals/add" element={<AddReferral />} />
              <Route path="patients/insurance" element={<Insurance />} />
              <Route path="patients/insurance/link" element={<LinkProvider />} />
              <Route path="patients/insurance/add" element={<AddInsurance />} />
              <Route path="patients/insurance/edit" element={<AddInsurance />} />

              {/* Clinical Notes - 4 Pages */}
              <Route path="notes" element={<ClinicalNotes />} />
              <Route path="notes/new" element={<NewNote />} />
              <Route path="/notes/soap/:id" element={<SOAPNotePage />} />
              <Route path="/notes/rmdq/:id" element={<RMDQAssessment />} />
              <Route path="/notes/intake/:id" element={<IntakeAssessment />} />
              <Route path="/notes/hep/:id" element={<HomeExercises />} />
              <Route path="/notes/plan/:id" element={<TreatmentPlan />} />
              <Route path="/notes/survey/:id" element={<PatientSurvey />} />
              <Route path="/notes/discharge/:id" element={<DischargeSummary />} />
              <Route path="notes/view/:id" element={<ViewNote />} />
              <Route path="notes/templates" element={<NoteTemplates />} />
              <Route path="notes/templates/new" element={<CreateTemplate />} />
              <Route path="notes/attachments" element={<Attachments />} />

              {/* Communication - 5 Pages */}
              <Route path="communication" element={<Communication />} />
              <Route path="communication/sms" element={<SMSChat />} />
              <Route path="communication/email" element={<EmailMessages />} />
              <Route path="communication/bulk" element={<BulkMessaging />} />
              <Route path="communication/telehealth" element={<Telehealth />} />
              <Route path="communication/templates" element={<CommTemplates />} />

              {/* Billing & Payments - 6 Pages */}
              <Route path="billing" element={hasAccess('Billing & Payments', 'Invoices') ? <Billing /> : <Navigate to="/" />} />
              <Route path="billing/new" element={hasAccess('Billing & Payments', 'New Invoice') ? <NewInvoice /> : <Navigate to="/" />} />
              <Route path="billing/payments" element={hasAccess('Billing & Payments', 'Payments') ? <Payments /> : <Navigate to="/" />} />
              <Route path="billing/payments/record" element={hasAccess('Billing & Payments', 'Payments') ? <RecordPaymentPage /> : <Navigate to="/" />} />
              <Route path="billing/payments/view/:id" element={hasAccess('Billing & Payments', 'Invoices') ? <InvoiceDetailPage /> : <Navigate to="/" />} />
              <Route path="billing/claims" element={hasAccess('Billing & Payments', 'Claims') ? <InsuranceClaims /> : <Navigate to="/" />} />
              <Route path="billing/claims/new" element={hasAccess('Billing & Payments', 'Claims') ? <NewClaimPage /> : <Navigate to="/" />} />
              <Route path="billing/claims/batch" element={hasAccess('Billing & Payments', 'Claims') ? <SubmitBatchPage /> : <Navigate to="/" />} />
              <Route path="billing/claims/view/:id" element={hasAccess('Billing & Payments', 'Claims') ? <ClaimDetailPage /> : <Navigate to="/" />} />
              <Route path="billing/reminders" element={hasAccess('Billing & Payments', 'Claims') ? <PaymentReminders /> : <Navigate to="/" />} />
              <Route path="billing/reminders/add" element={hasAccess('Billing & Payments', 'Claims') ? <AddReminderRulePage /> : <Navigate to="/" />} />
              <Route path="billing/pricing" element={hasAccess('Billing & Payments', 'Pricing') ? <PricingServices /> : <Navigate to="/" />} />
              <Route path="billing/pricing/add" element={hasAccess('Billing & Payments', 'Pricing') ? <AddServicePage /> : <Navigate to="/" />} />
              <Route path="billing/pricing/edit/:id" element={hasAccess('Billing & Payments', 'Pricing') ? <EditServicePage /> : <Navigate to="/" />} />

              {/* Forms & Intake - 5 Pages */}
              <Route path="forms" element={hasAccess('Forms') ? <FormBuilder /> : <Navigate to="/" />} />
              <Route path="forms/consent" element={hasAccess('Forms') ? <FormConsent /> : <Navigate to="/" />} />
              <Route path="forms/history" element={hasAccess('Forms') ? <HealthHistory /> : <Navigate to="/" />} />
              <Route path="forms/assessments" element={hasAccess('Forms') ? <Assessments /> : <Navigate to="/" />} />
              <Route path="forms/builder" element={hasAccess('Forms') ? <FormBuilder /> : <Navigate to="/" />} />

              {/* Analytics - 5 Pages */}
              <Route path="analytics" element={hasAccess('Analytics') ? <Analytics /> : <Navigate to="/" />} />
              <Route path="analytics/revenue" element={hasAccess('Analytics') ? <RevenueReports /> : <Navigate to="/" />} />
              <Route path="analytics/growth" element={hasAccess('Analytics') ? <PatientGrowth /> : <Navigate to="/" />} />
              <Route path="analytics/services" element={hasAccess('Analytics') ? <ServicePopularity /> : <Navigate to="/" />} />
              <Route path="analytics/staff" element={hasAccess('Analytics') ? <StaffPerformance /> : <Navigate to="/" />} />

              {/* Marketing - 4 Pages */}
              <Route path="marketing" element={hasAccess('Marketing') ? <Marketing /> : <Navigate to="/" />} />
              <Route path="marketing/segments" element={hasAccess('Marketing') ? <MarketingSegments /> : <Navigate to="/" />} />
              <Route path="marketing/automation" element={hasAccess('Marketing') ? <MarketingAutomation /> : <Navigate to="/" />} />
              <Route path="marketing/analytics" element={hasAccess('Marketing') ? <MarketingAnalytics /> : <Navigate to="/" />} />

              {/* Integrations - 6 Pages */}
              <Route path="integrations" element={hasAccess('Integrations') ? <Integrations /> : <Navigate to="/" />} />
              <Route path="integrations/google" element={hasAccess('Integrations') ? <IntegrationService /> : <Navigate to="/" />} />
              <Route path="integrations/outlook" element={hasAccess('Integrations') ? <IntegrationService /> : <Navigate to="/" />} />
              <Route path="integrations/stripe" element={hasAccess('Integrations') ? <IntegrationService /> : <Navigate to="/" />} />
              <Route path="integrations/paypal" element={hasAccess('Integrations') ? <IntegrationService /> : <Navigate to="/" />} />
              <Route path="integrations/quickbooks" element={hasAccess('Integrations') ? <IntegrationService /> : <Navigate to="/" />} />
              <Route path="integrations/xero" element={hasAccess('Integrations') ? <IntegrationService /> : <Navigate to="/" />} />
              <Route path="integrations/manual" element={<ClinicManual />} />

              {/* Clients & Insurers - 2 Pages */}
              <Route path="clients" element={hasAccess('Patients') ? <ClientsInsurers /> : <Navigate to="/" />} />
              <Route path="clients/register" element={hasAccess('Patients') ? <RegisterClient /> : <Navigate to="/" />} />

              {/* Settings - 7 Pages */}
              <Route path="settings" element={<Settings />} />
              <Route path="settings/users" element={<UserManagement />} />
              <Route path="settings/users/add" element={<AddUser />} />
              <Route path="settings/users/edit/:id" element={<EditUser />} />
              <Route path="settings/users/audit/:id" element={<UserAudit />} />
              <Route path="settings/roles" element={<RolesPermissions />} />
              <Route path="settings/roles/add" element={<AddRole />} />
              <Route path="settings/clinic" element={<ClinicDetails />} />
              <Route path="settings/location" element={<MultiLocation />} />
              <Route path="settings/security" element={<SecuritySettings />} />
              <Route path="settings/backup" element={<DataBackup />} />
              <Route path="settings/notifications" element={<NotificationSettings />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
