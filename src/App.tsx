import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import BeginnerWorkouts from '@/pages/BeginnerWorkouts';
import WorkoutDetail from '@/pages/WorkoutDetail';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Schedule from '@/pages/Schedule';
import Gallery from '@/pages/Gallery';
import Nutrition from '@/pages/Nutrition';
import NutritionDetail from '@/pages/NutritionDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="nutrition" element={<Nutrition />} />
          <Route path="nutrition/:id" element={<NutritionDetail />} />

          <Route path="schedule" element={<Schedule />} />
          <Route path="beginner-workouts" element={<BeginnerWorkouts />} />
          <Route path="beginner-workouts/:id" element={<WorkoutDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
