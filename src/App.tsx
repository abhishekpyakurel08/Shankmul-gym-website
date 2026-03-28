import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Core Components
import Layout from '@/components/Layout';


// Lazy Loaded Pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const WorkoutDetail = lazy(() => import('@/pages/WorkoutDetail'));
const NutritionDetail = lazy(() => import('@/pages/NutritionDetail'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));



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


function App() {
  return (

    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="nutrition/:id" element={<NutritionDetail />} />
            <Route path="beginner-workouts/:id" element={<WorkoutDetail />} />
            {/* <Route path="download" element={<DownloadPage />} /> */}
            {/* <Route path="download-app" element={<DownloadAppPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>


        </Routes>
      </Suspense>
    </BrowserRouter>

  )
}

export default App
