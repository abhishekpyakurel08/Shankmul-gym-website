import MotivationCarousel from '@/components/MotivationCarousel';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';

import NutritionSection from '@/components/sections/NutritionSection';
import TrainersSection from '@/components/sections/TrainersSection';
import ScheduleSection from '@/components/sections/ScheduleSection';
import GallerySection from '@/components/sections/GallerySection';
import WorkoutsSection from '@/components/sections/WorkoutsSection';
import MotivationSection from '@/components/sections/MotivationSection';
import ContactSection from '@/components/sections/ContactSection';
import SEO from '@/components/SEO';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage';

const VALID_HASHES = ['#home', '#about', '#nutrition', '#trainers', '#schedule', '#gallery', '#workouts', '#contact'];

const HomePage = () => {
    const { hash } = useLocation();
    const [isValidHash, setIsValidHash] = useState(true);

    useEffect(() => {
        if (hash) {
            if (!VALID_HASHES.includes(hash)) {
                setIsValidHash(false);
            } else {
                setIsValidHash(true);
            }
        } else {
            setIsValidHash(true);
        }
    }, [hash]);

    if (!isValidHash) {
        return <NotFoundPage />;
    }

    return (
        <div id="home" className="bg-white">
            <SEO
                title="Forge Your Ultimate Body | Kathmandu's Premier Gym"
                description="Join Shankhamul Health Club & Fitness Centre, the leading fitness destination in Kathmandu. Expert trainers, premium equipment, and results-driven programs."
            />
            {/* Hero Section */}
            <HeroSection />

            {/* Daily Quotes Section */}
            <MotivationCarousel />

            {/* About Section */}
            <AboutSection />

            {/* Gallery Section */}
            <GallerySection />

            {/* Nutrition Section */}
            <NutritionSection />

            {/* Trainers Section */}
            <TrainersSection />

            {/* Schedule Section */}
            <ScheduleSection />



            {/* Beginner Workouts Section */}
            <WorkoutsSection />

            {/* Motivation Section */}
            <MotivationSection />



            {/* Contact & Map Section */}
            <ContactSection />
        </div>
    );
};

export default HomePage;

