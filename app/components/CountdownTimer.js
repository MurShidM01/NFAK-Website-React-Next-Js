'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate, title, type }) {
  const [timeLeft, setTimeLeft] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--'
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      // Parse the target date and create a date for the current year
      const [month, day] = targetDate.split('-'); // Extract month and day
      let target = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day));
      
      // If the target date has passed this year, calculate for next year
      if (target < now) {
        target = new Date(now.getFullYear() + 1, parseInt(month) - 1, parseInt(day));
      }
      
      const difference = target - now;
      

      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      } else {
        // If the difference is 0 or negative, set all to 00
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const icon = type === 'death' ? '🕊️' : '🎂';
  const subtitle = type === 'death' ? 'In Loving Memory • 1997' : 'Celebrating Life • 1948';
  const date = type === 'death' ? '16 August' : '13 October';
  
  // Get the current target year for display
  const getCurrentTargetYear = () => {
    const now = new Date();
    const [month, day] = targetDate.split('-');
    let target = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day));
    
    if (target < now) {
      target = new Date(now.getFullYear() + 1, parseInt(month) - 1, parseInt(day));
    }
    
    return target.getFullYear();
  };
  
  const emotionalMessage = type === 'death' 
    ? "Every moment brings us closer to honoring his eternal legacy"
    : "Every moment brings us closer to celebrating his beautiful life";

  const timeUnits = [
    { value: timeLeft.days, label: 'Days', color: 'from-blue-500 to-cyan-500' },
    { value: timeLeft.hours, label: 'Hours', color: 'from-purple-500 to-pink-500' },
    { value: timeLeft.minutes, label: 'Minutes', color: 'from-orange-500 to-red-500' },
    { value: timeLeft.seconds, label: 'Seconds', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-amber-100 text-center transition-all duration-1000 hover:glow-pulse ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      
      {/* Floating Background Elements */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-8 sm:w-16 h-8 sm:h-16 bg-amber-200 rounded-full opacity-20 floating-element" style={{"--delay": "0"}}></div>
      <div className="absolute top-4 sm:top-8 right-3 sm:right-6 w-6 sm:w-12 h-6 sm:h-12 bg-orange-200 rounded-full opacity-30 floating-element" style={{"--delay": "1"}}></div>
      <div className="absolute bottom-3 sm:bottom-6 left-4 sm:left-8 w-10 sm:w-20 h-10 sm:h-20 bg-yellow-200 rounded-full opacity-25 floating-element" style={{"--delay": "2"}}></div>
      
      {/* Main Icon with Glow Effect */}
      <div className="relative mb-4 sm:mb-6">
        <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 heartbeat">
          {icon}
        </div>
        <div className="absolute inset-0 text-4xl sm:text-5xl lg:text-6xl opacity-20 gentle-float">
          {icon}
        </div>
      </div>

      {/* Title with Beautiful Typography */}
      <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-800 mb-2 sm:mb-3 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
        {title}
      </h3>
      
      {/* Date with Elegant Styling */}
      <div className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 font-medium">
        {date} {getCurrentTargetYear()}
      </div>

      {/* Emotional Message */}
      <p className="text-gray-600 text-xs sm:text-sm mb-6 sm:mb-8 italic leading-relaxed max-w-md mx-auto px-2">
        {emotionalMessage}
      </p>

      {/* Beautiful Countdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
        {timeUnits.map((unit, index) => (
          <div 
            key={unit.label}
            className={`relative group cursor-pointer transition-all duration-500 hover:scale-110 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Glowing Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} rounded-xl opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300`}></div>
            
            {/* Main Card */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-2 sm:p-3 lg:p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-br ${unit.color} bg-clip-text text-transparent mb-1 countdown-number`}>
                {unit.value}
              </div>
              <div className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                {unit.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtitle with Elegant Design */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200 to-transparent h-px opacity-50"></div>
        <p className="text-gray-600 text-xs sm:text-sm font-medium relative bg-white px-2 sm:px-4 inline-block">
          {subtitle}
        </p>
      </div>
      
      {/* Auto-update indicator */}
      <div className="mt-2 sm:mt-3 text-xs text-amber-600 font-medium px-2">
        ✨ Auto-updates to {getCurrentTargetYear() + 1} after {date} {getCurrentTargetYear()}
      </div>

      {/* Floating Hearts/Stars */}
      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 text-amber-400 gentle-float text-sm sm:text-base">✨</div>
      <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 text-orange-400 floating-element text-sm sm:text-base" style={{"--delay": "0.5"}}>💫</div>
      <div className="absolute top-1/2 left-1 sm:left-2 text-yellow-400 floating-element text-sm sm:text-base" style={{"--delay": "1.5"}}>🌟</div>
      <div className="absolute top-1/2 right-1 sm:right-2 text-pink-400 heartbeat text-sm sm:text-base">💝</div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
    </div>
  );
}
