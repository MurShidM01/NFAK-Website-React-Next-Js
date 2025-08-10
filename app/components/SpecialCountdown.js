'use client';

import { useState, useEffect } from 'react';

export default function SpecialCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--'
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date('2025-08-16T23:59:00');
      
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
        // Time has reached zero - redirect to website
        if (!isRedirecting) {
          setIsRedirecting(true);
          // Redirect to the main page
          window.location.href = '/';
        }
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [isRedirecting]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days', color: 'from-red-500 to-pink-500' },
    { value: timeLeft.hours, label: 'Hours', color: 'from-purple-500 to-indigo-500' },
    { value: timeLeft.minutes, label: 'Minutes', color: 'from-blue-500 to-cyan-500' },
    { value: timeLeft.seconds, label: 'Seconds', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 rounded-2xl p-8 shadow-2xl border-2 border-red-200 text-center transition-all duration-1000 hover:glow-pulse ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      
      {/* Special Background Elements */}
      <div className="absolute top-4 left-4 w-20 h-20 bg-red-200 rounded-full opacity-30 floating-element" style={{"--delay": "0"}}></div>
      <div className="absolute top-8 right-6 w-16 h-16 bg-pink-200 rounded-full opacity-40 floating-element" style={{"--delay": "1"}}></div>
      <div className="absolute bottom-6 left-8 w-24 h-24 bg-purple-200 rounded-full opacity-35 floating-element" style={{"--delay": "2"}}></div>
      
      {/* Special Icon */}
      <div className="relative mb-6">
        <div className="text-7xl mb-2 heartbeat">
          🎯
        </div>
        <div className="absolute inset-0 text-7xl opacity-20 gentle-float">
          🎯
        </div>
      </div>

      {/* Special Title */}
      <h3 className="text-3xl font-light text-gray-800 mb-3 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
        Special Countdown
      </h3>
      
      {/* Special Date */}
      <div className="text-xl text-gray-700 mb-4 font-medium">
        August 16, 2025 • 11:59 PM
      </div>

      {/* Special Message */}
      <p className="text-gray-600 text-sm mb-6 italic leading-relaxed max-w-md mx-auto">
        Countdown to a special moment in Ustad Nusrat Fateh Ali Khan's legacy
      </p>

      {/* Special Countdown Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {timeUnits.map((unit, index) => (
          <div 
            key={unit.label}
            className={`relative group cursor-pointer transition-all duration-500 hover:scale-110 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Glowing Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} rounded-xl opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300`}></div>
            
            {/* Main Card */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-4 border-2 border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className={`text-4xl font-bold bg-gradient-to-br ${unit.color} bg-clip-text text-transparent mb-1 countdown-number`}>
                {unit.value}
              </div>
              <div className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                {unit.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Subtitle */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300 to-transparent h-px opacity-60"></div>
        <p className="text-red-600 text-sm font-medium relative bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 px-4 inline-block">
          ⏰ Automatic Redirect at Zero ⏰
        </p>
      </div>

      {/* Special Floating Elements */}
      <div className="absolute top-2 right-2 text-red-400 gentle-float">🎯</div>
      <div className="absolute bottom-2 left-2 text-pink-400 floating-element" style={{"--delay": "0.5"}}>✨</div>
      <div className="absolute top-1/2 left-2 text-purple-400 floating-element" style={{"--delay": "1.5"}}>🌟</div>
      <div className="absolute top-1/2 right-2 text-red-500 heartbeat">💫</div>

      {/* Special Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-70"></div>

      {/* Redirecting Message */}
      {isRedirecting && (
        <div className="absolute inset-0 bg-red-500/90 rounded-2xl flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="text-4xl mb-4 animate-spin">🔄</div>
            <div className="text-xl font-medium">Redirecting...</div>
            <div className="text-sm opacity-80">Taking you to the tribute website</div>
          </div>
        </div>
      )}
    </div>
  );
}
