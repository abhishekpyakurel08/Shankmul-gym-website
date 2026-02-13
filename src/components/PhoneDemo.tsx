import { Activity, Dumbbell, Calendar, User, TrendingUp } from 'lucide-react';

export const PhoneDemo = () => {
    return (
        <div className="relative mx-auto border-gray-900 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col items-center justify-start overflow-hidden">
            {/* Notch / Dynamic Island */}
            <div className="absolute top-0 w-1/3 h-[30px] bg-black rounded-b-xl z-20 left-1/2 -translate-x-1/2"></div>

            {/* Side Buttons */}
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>

            {/* Screen Content */}
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-50 relative flex flex-col pt-10">

                {/* Header */}
                <div className="px-6 pb-4 flex justify-between items-center bg-white shadow-sm z-10">
                    <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Good Morning</p>
                        <h3 className="text-xl font-bold text-slate-900">Alex</h3>
                    </div>
                    <div className="h-10 w-10 bg-slate-200 rounded-full overflow-hidden border-2 border-slate-100">
                        <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold">A</div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-slate-50 scrollbar-hide">

                    {/* Weekly Goal Card */}
                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-indigo-200 text-xs font-medium uppercase mb-1">Weekly Goal</p>
                                <h4 className="text-2xl font-bold">4 / 5 days</h4>
                            </div>
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                <TrendingUp size={20} className="text-white" />
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-indigo-900/30 h-2 rounded-full overflow-hidden">
                            <div className="bg-white h-full rounded-full w-4/5"></div>
                        </div>
                        <p className="text-xs text-indigo-200 mt-2">You're crushing it! Keep it up.</p>
                    </div>

                    {/* Today's Workout */}
                    <div>
                        <h4 className="text-slate-900 font-bold mb-3 flex items-center">
                            Today's Workout
                            <span className="ml-auto text-xs text-indigo-600 font-medium">View All</span>
                        </h4>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                <Dumbbell size={24} />
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-800">Upper Body Power</h5>
                                <p className="text-xs text-slate-500">45 mins • Intermediate</p>
                            </div>
                        </div>
                    </div>

                    {/* Nutrition Summary */}
                    <div>
                        <h4 className="text-slate-900 font-bold mb-3">Nutrition</h4>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <span className="text-2xl font-bold text-slate-800">1,840</span>
                                    <span className="text-xs text-slate-500 ml-1">kcal consumed</span>
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">On Track</span>
                            </div>
                            {/* Macros */}
                            <div className="flex gap-2 mt-3">
                                <div className="flex-1 bg-slate-50 p-2 rounded-lg text-center">
                                    <div className="h-1 bg-red-400 rounded-full mb-1 w-3/4 mx-auto"></div>
                                    <span className="text-[10px] text-slate-500 font-medium">Carbs</span>
                                </div>
                                <div className="flex-1 bg-slate-50 p-2 rounded-lg text-center">
                                    <div className="h-1 bg-blue-400 rounded-full mb-1 w-1/2 mx-auto"></div>
                                    <span className="text-[10px] text-slate-500 font-medium">Protein</span>
                                </div>
                                <div className="flex-1 bg-slate-50 p-2 rounded-lg text-center">
                                    <div className="h-1 bg-yellow-400 rounded-full mb-1 w-2/3 mx-auto"></div>
                                    <span className="text-[10px] text-slate-500 font-medium">Fat</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Nav */}
                <div className="h-16 bg-white border-t border-slate-100 flex justify-around items-center px-2 pb-2">
                    <div className="flex flex-col items-center gap-1 text-indigo-600">
                        <Activity size={20} />
                        <span className="text-[10px] font-medium">Home</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-400">
                        <Calendar size={20} />
                        <span className="text-[10px] font-medium">Schedule</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-400">
                        <User size={20} />
                        <span className="text-[10px] font-medium">Profile</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
