import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { HelmetProvider } from 'react-helmet-async';

// Core Components
import Layout from '@/components/Layout';
import AdminLayout from './components/admin/AdminLayout';
import ReceptionLayout from './components/reception/ReceptionLayout';

// Lazy Loaded Pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const WorkoutDetail = lazy(() => import('@/pages/WorkoutDetail'));
const NutritionDetail = lazy(() => import('@/pages/NutritionDetail'));
const DownloadPage = lazy(() => import('@/pages/DownloadPage'));
const DownloadAppPage = lazy(() => import('@/pages/DownloadAppPage'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const MembersPage = lazy(() => import('./pages/admin/MembersPage'));
const AddMember = lazy(() => import('./pages/admin/AddMember'));
const LiveAttendance = lazy(() => import('./pages/admin/LiveAttendance'));
const Financials = lazy(() => import('./pages/admin/Financials'));
const Notifications = lazy(() => import('./pages/admin/Notifications'));
const GymHoursPage = lazy(() => import('./pages/admin/GymHoursPage'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));

const ReceptionDashboard = lazy(() => import('./pages/reception/ReceptionDashboard'));
const ReceptionLogin = lazy(() => import('./pages/reception/ReceptionLogin'));

// Loading Placeholder
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F172A]">
    <div className="w-24 h-24 mb-8 bg-white rounded-3xl p-1 flex items-center justify-center shadow-2xl animate-pulse">
      <img src="/shankhamul-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-[1.4rem]" />
    </div>
    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-white font-black text-[10px] uppercase tracking-[0.3em] opacity-50">Synchronizing Hub...</p>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes (Mitigates 429 by reducing refetches)
      gcTime: 1000 * 60 * 30,    // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false, // Prevents 429 when switching tabs
      refetchOnMount: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="nutrition/:id" element={<NutritionDetail />} />
                    <Route path="beginner-workouts/:id" element={<WorkoutDetail />} />
                    <Route path="download" element={<DownloadPage />} />
                    <Route path="download-app" element={<DownloadAppPage />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="dashboard" element={<AdminOverview />} />
                    <Route path="live" element={<LiveAttendance />} />
                    <Route path="finance" element={<Financials />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="members" element={<MembersPage />} />
                    <Route path="members/add" element={<AddMember />} />
                    <Route path="hours" element={<GymHoursPage />} />
                    <Route path="profile" element={<AdminProfile />} />
                  </Route>

                  {/* Reception Routes */}
                  <Route path="/reception/login" element={<ReceptionLogin />} />
                  <Route path="/reception" element={<ProtectedRoute allowedRoles={['admin', 'reception']}><ReceptionLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<ReceptionDashboard />} />
                    <Route path="live" element={<LiveAttendance />} />
                    <Route path="members" element={<MembersPage />} />
                    <Route path="members/add" element={<AddMember />} />
                    <Route path="alerts" element={<Notifications />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </NotificationProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
