import MotivationCarousel from '@/components/MotivationCarousel';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import NutritionSection from '@/components/sections/NutritionSection';
import TrainersSection from '@/components/sections/TrainersSection';
import ScheduleSection from '@/components/sections/ScheduleSection';
import GallerySection from '@/components/sections/GallerySection';
import WorkoutsSection from '@/components/sections/WorkoutsSection';
import MotivationSection from '@/components/sections/MotivationSection';
import ContactSection from '@/components/sections/ContactSection';
import SEO from '@/components/SEO';

const HomePage = () => {
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

            {/* Services Section */}
            <ServicesSection />

            {/* Nutrition Section */}
            <NutritionSection />

            {/* Trainers Section */}
            <TrainersSection />

            {/* Schedule Section */}
            <ScheduleSection />

            {/* Gallery Section */}
            <GallerySection />

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

