'use client';

export default function AchievementsTimeline() {
  const achievements = [
    {
      year: "1965",
      title: "First Public Performance",
      description: "Made his debut as a Qawwali performer at the age of 17",
      category: "Performance"
    },
    {
      year: "1971",
      title: "International Recognition",
      description: "Gained recognition in Pakistan and neighboring countries",
      category: "Recognition"
    },
    {
      year: "1985",
      title: "Global Breakthrough",
      description: "Performed at the WOMAD Festival, introducing Qawwali to Western audiences",
      category: "International"
    },
    {
      year: "1988",
      title: "Royal Albert Hall",
      description: "Historic performance at London's prestigious Royal Albert Hall",
      category: "Venue"
    },
    {
      year: "1990",
      title: "Film Soundtracks",
      description: "Contributed to 'Dead Man Walking' soundtrack, expanding his reach",
      category: "Film"
    },
    {
      year: "1995",
      title: "Carnegie Hall",
      description: "Performed at New York's iconic Carnegie Hall",
      category: "Venue"
    },
    {
      year: "1996",
      title: "Final Performances",
      description: "Last major performances before his passing",
      category: "Legacy"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Performance: "bg-blue-100 text-blue-800",
      Recognition: "bg-green-100 text-green-800",
      International: "bg-purple-100 text-purple-800",
      Venue: "bg-amber-100 text-amber-800",
      Film: "bg-pink-100 text-pink-800",
      Legacy: "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h4 className="text-xl font-medium text-gray-800 mb-2">Achievements Timeline</h4>
        <p className="text-gray-600 text-sm">Key milestones in his extraordinary career</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-amber-400 rounded-full border-4 border-white shadow-sm"></div>
              
              {/* Content */}
              <div className="ml-16 flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-lg font-semibold text-gray-800 mr-3">
                    {achievement.year}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement.category)}`}>
                    {achievement.category}
                  </span>
                </div>
                
                <h5 className="text-lg font-medium text-gray-800 mb-2">
                  {achievement.title}
                </h5>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-semibold text-amber-600">125+</div>
            <div className="text-xs text-gray-500">Albums</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-amber-600">40+</div>
            <div className="text-xs text-gray-500">Countries</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-amber-600">1000+</div>
            <div className="text-xs text-gray-500">Performances</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-amber-600">25+</div>
            <div className="text-xs text-gray-500">Years</div>
          </div>
        </div>
      </div>
    </div>
  );
}
