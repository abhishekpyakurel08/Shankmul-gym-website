import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import WorkoutDetail from '@/pages/WorkoutDetail';
import NutritionDetail from '@/pages/NutritionDetail';

import DownloadPage from '@/pages/DownloadPage';
import DownloadAppPage from '@/pages/DownloadAppPage';

// Admin imports
import { AuthProvider, ProtectedRoute } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import MembersPage from './pages/admin/MembersPage';
import AddMember from './pages/admin/AddMember';
import LiveAttendance from './pages/admin/LiveAttendance';
import Financials from './pages/admin/Financials';
import Notifications from './pages/admin/Notifications';
import StaffPage from './pages/admin/StaffPage';
import GymHoursPage from './pages/admin/GymHoursPage';
import AdminProfile from './pages/admin/AdminProfile';
import ReceptionLayout from './components/reception/ReceptionLayout';
import ReceptionDashboard from './pages/reception/ReceptionDashboard';
import AlertsCenter from './pages/admin/Notifications'; // Assuming reuse


function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
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
              <Route path="staff" element={<StaffPage />} />
              <Route path="hours" element={<GymHoursPage />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            {/* Reception Routes - Supporting 'reciption' typo as requested */}
            <Route
              path="/reciption"
              element={
                <ProtectedRoute allowedRoles={['admin', 'reception']}>
                  <ReceptionLayout />
                </ProtectedRoute>


              }
            >
              <Route path="dashboard" element={<ReceptionDashboard />} />
              <Route path="live" element={<LiveAttendance />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="alerts" element={<AlertsCenter />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
