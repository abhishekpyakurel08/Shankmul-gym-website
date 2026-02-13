import React, { useState } from 'react';
import { PhoneDemo } from '@/components/PhoneDemo';
import {
  Dumbbell,
  Calendar,
  TrendingUp,
  Download,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Smartphone,
  FileText
} from 'lucide-react';

const DownloadPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: <Dumbbell className="w-8 h-8 text-indigo-500" />,
      title: "Custom Workouts",
      description: "Access hundreds of workout plans tailored to your fitness level and goals."
    },
    {
      icon: <Calendar className="w-8 h-8 text-indigo-500" />,
      title: "Class Scheduling",
      description: "Book your favorite gym classes instantly and get reminders so you never miss a session."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-500" />,
      title: "Real-time Analytics",
      description: "Track your progress with detailed charts and insights on your performance."
    },
  ];

  const faqs = [
    {
      question: "Is the app free to download?",
      answer: "Yes! The Shankmul Gym app is free to download on both iOS and Android. Some premium features may require a gym membership."
    },
    {
      question: "Can I book personal training sessions?",
      answer: "Absolutely. You can browse trainer profiles and book sessions directly through the app."
    },
    {
      question: "Does it sync with my wearable device?",
      answer: "We support integration with major wearables like Apple Watch, Fitbit, and Garmin to sync your activity data."
    },
  ];

  return (
    <div className="font-sans text-slate-900 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-28 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900 pointer-events-none"></div>
        {/* Background Decorative Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                New Version 2.0 Available
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 mb-6 drop-shadow-sm leading-tight">
                Your Pocket Personal <br className="hidden lg:block" /> Trainer
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience the gym like never before. Track workouts, analyze nutrition, and connect with the community—all from one powerful app.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="flex items-center justify-center gap-3 bg-white text-slate-900 px-6 py-3.5 rounded-xl font-bold hover:bg-indigo-50 hover:shadow-lg transition-all transform hover:-translate-y-1 group">
                  <Smartphone className="w-6 h-6 text-indigo-600" />
                  <div className="text-left leading-tight">
                    <div className="text-[10px] font-medium text-slate-500 uppercase">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center justify-center gap-3 bg-slate-800 text-white border border-slate-700 px-6 py-3.5 rounded-xl font-bold hover:bg-slate-700 hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a2.036 2.036 0 01-.58-3.08L6.89 15.225 3.61 11.96 3.03 2.5a2.036 2.036 0 01.579-3.086v2.4zM15.42 13.628l-8.038 8.01 9.49-5.41a1.94 1.94 0 00.957-1.63L15.42 13.628zm2.418-2.61l2.483 1.41a1.94 1.94 0 000-3.41L17.838 11.02zM15.42 10.372L17.84 8.98 8.35 3.57 3.61 8.303l11.81 2.07z" />
                    </svg>
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-[10px] font-medium text-slate-400 uppercase">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </button>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2" aria-label="User avatars">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] text-white font-medium bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`}></div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <span>4.9/5 from 2,000+ users</span>
                </div>
              </div>

            </div>

            {/* Phone Mockup */}
            <div className="flex-1 lg:h-auto flex items-center justify-center perspective-1000">
              <div className="transform rotate-y-12 rotate-x-6 scale-90 lg:scale-100 transition-transform duration-700 hover:rotate-0">
                <PhoneDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Download Our App?</h2>
            <p className="text-slate-600">
              We've packed powerful features into a simple interface to help you focus on what matters—your workout.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-indigo-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Downloads */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Additional Resources</h2>
              <p className="text-slate-500">Download offline materials for your reference.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group border border-slate-200 p-6 rounded-xl hover:border-indigo-500 transition-colors flex items-start gap-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100 transition">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Gym Brochure 2024</h4>
                <p className="text-sm text-slate-500 mb-3">Overview of facilities and pricing.</p>
                <a href="/brochure.pdf" download className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  Download PDF <Download size={14} />
                </a>
              </div>
            </div>

            <div className="group border border-slate-200 p-6 rounded-xl hover:border-indigo-500 transition-colors flex items-start gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-100 transition">
                <Calendar size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Weekly Class Schedule</h4>
                <p className="text-sm text-slate-500 mb-3">Yoga, HIIT, and Cardio timings.</p>
                <a href="/schedule.pdf" download className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  Download PDF <Download size={14} />
                </a>
              </div>
            </div>

            <div className="group border border-slate-200 p-6 rounded-xl hover:border-indigo-500 transition-colors flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition">
                <CheckCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Nutrition Guide</h4>
                <p className="text-sm text-slate-500 mb-3">Starter pack for healthy eating.</p>
                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                  Coming Soon
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-800 hover:bg-slate-50 transition"
                >
                  {faq.question}
                  {openFaq === index ? <ChevronUp size={20} className="text-indigo-500" /> : <ChevronDown size={20} className="text-slate-400" />}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-indigo-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your body?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of members who are tracking their fitness journey with Shankmul Gym.
          </p>
          <button className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:bg-slate-50 transition transform hover:-translate-y-1">
            Download App Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default DownloadPage;
