export const workoutsData = [
    {
        id: "full-body",
        title: "Full Body Foundation",
        duration: "30 Mins",
        exercisesCount: 5,
        level: "Easy",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=60",
        description: "Perfect for your first day. Covers all major muscle groups with low impact movements.",
        details: {
            warmup: "5 mins light jogging or jumping jacks",
            steps: [
                { name: "Bodyweight Squats", sets: 3, reps: "12 reps", notes: "Keep chest up and knees out.", imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=500&auto=format&fit=crop" },
                { name: "Push-ups (Knees or Regular)", sets: 3, reps: "10 reps", notes: "Maintain a straight plank position.", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format&fit=crop" },
                { name: "Lunges", sets: 3, reps: "10 per leg", notes: "Step forward ensuring knee doesn't go past toes.", imageUrl: "https://images.unsplash.com/photo-1434608519344-49d77a699ded?w=500&auto=format&fit=crop" },
                { name: "Plank Hold", sets: 3, reps: "30 seconds", notes: "Engage core, keep back flat.", imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop" },
                { name: "Glute Bridges", sets: 3, reps: "15 reps", notes: "Squeeze glutes at the top.", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop" }
            ],
            cooldown: "5 mins static stretching"
        }
    },
    {
        id: "core-starter",
        title: "Core Stability Starter",
        duration: "20 Mins",
        exercisesCount: 4,
        level: "Easy",
        image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop&q=60",
        description: "Build a strong core foundation which is essential for all future training.",
        details: {
            warmup: "3 mins high knees",
            steps: [
                { name: "Bird-Dog", sets: 3, reps: "10 per side", notes: "Move opposite arm and leg simultaneously.", imageUrl: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=500&auto=format&fit=crop" },
                { name: "Dead Bug", sets: 3, reps: "12 reps", notes: "Keep lower back pressed to the floor.", imageUrl: "https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?w=500&auto=format&fit=crop" },
                { name: "Side Plank", sets: 3, reps: "20 sec per side", notes: "Lift hips high.", imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=500&auto=format&fit=crop" },
                { name: "Crunches", sets: 3, reps: "15 reps", notes: "Focus on upper abs contraction.", imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop" }
            ],
            cooldown: "Child's pose and cobra stretch"
        }
    },
    {
        id: "intro-cardio",
        title: "Intro to Cardio",
        duration: "25 Mins",
        exercisesCount: 3,
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1538805060504-d14b8e288420?w=800&auto=format&fit=crop&q=60",
        description: "Get your heart rate up without burning out. A gentle introduction to stamina.",
        details: {
            warmup: "2 mins walking",
            steps: [
                { name: "Jumping Jacks", sets: 4, reps: "45 seconds", notes: "Land softly.", imageUrl: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=500&auto=format&fit=crop" },
                { name: "Mountain Climbers", sets: 4, reps: "30 seconds", notes: "Drive knees to chest.", imageUrl: "https://images.unsplash.com/photo-1434608519344-49d77a699ded?w=500&auto=format&fit=crop" },
                { name: "Burpees (No Pushup)", sets: 4, reps: "30 seconds", notes: "Step back if jumping is too hard.", imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop" }
            ],
            cooldown: "Slow walking and deep breathing"
        }
    },
    {
        id: "balance-flex",
        title: "Balance & Flexibility",
        duration: "40 Mins",
        exercisesCount: 6,
        level: "Easy",
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&auto=format&fit=crop&q=60",
        description: "Improve your range of motion and prevent injuries with these essential stretches.",
        details: {
            warmup: "Joint rotations (neck, shoulders, hips)",
            steps: [
                { name: "Tree Pose", sets: 2, reps: "30 sec hold", notes: "Focus on a stationary point.", imageUrl: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=500&auto=format&fit=crop" },
                { name: "Single Leg Reach", sets: 2, reps: "10 per leg", notes: "Hinge at hips.", imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=500&auto=format&fit=crop" },
                { name: "Cat-Cow Stretch", sets: 2, reps: "1 min", notes: "Move with breath.", imageUrl: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&auto=format&fit=crop" },
                { name: "Downward Dog", sets: 2, reps: "45 sec hold", notes: "Press heels towards floor.", imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop" },
                { name: "Seated Forward Fold", sets: 2, reps: "1 min hold", notes: "Relax hamstrings.", imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop" }
            ],
            cooldown: "Savasana (Lie flat and relax)"
        }
    }
];
