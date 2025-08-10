'use client';

import { useState, useEffect } from 'react';

export default function LandingPage() {
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
      const target = new Date('2025-08-16T00:00:00');
      
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
        // Time has reached zero - redirect to full website
        if (!isRedirecting) {
          setIsRedirecting(true);
          // Redirect to the main page with full content
          window.location.href = '/?unlock=true';
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 flex items-center justify-center p-6">
      <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        
        {/* Main Icon */}
        <div className="text-8xl mb-8 heartbeat">
          🕊️
        </div>

        {/* Main Title */}
        <h1 className="text-5xl font-light text-gray-800 mb-6 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
          Ustad Nusrat Fateh Ali Khan
        </h1>
        
        {/* Subtitle */}
        <p className="text-2xl text-gray-600 mb-8">
          Shahenshah-e-Qawwali • The Voice of the Soul
        </p>

        {/* Countdown Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white/60 mb-8">
          <h2 className="text-3xl font-light text-gray-800 mb-6 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            🎯 Special Countdown
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The full tribute website will be unlocked on <span className="font-semibold text-red-600">August 16, 2025 at 00:00 AM</span>. 
            Until then, enjoy this countdown to the grand reveal.
          </p>

          {/* Countdown Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {timeUnits.map((unit, index) => (
              <div 
                key={unit.label}
                className={`relative group cursor-pointer transition-all duration-500 hover:scale-110 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Glowing Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} rounded-2xl opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300`}></div>
                
                {/* Main Card */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className={`text-5xl font-bold bg-gradient-to-br ${unit.color} bg-clip-text text-transparent mb-2 countdown-number`}>
                    {unit.value}
                  </div>
                  <div className="text-gray-600 text-sm font-medium uppercase tracking-wider">
                    {unit.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Auto-Redirect Message */}
          <div className="bg-gradient-to-r from-red-50 to-purple-50 rounded-xl p-4 border border-red-200">
            <p className="text-red-600 text-sm font-medium">
              ⏰ Automatic redirect enabled • Website unlocks at zero ⏰
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/40">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            🎭 What to Expect (Shhh... It's a Secret!)
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>🎵 Something magical with music...</div>
            <div>📖 A journey through time...</div>
            <div>🖼️ Hidden treasures revealed...</div>
            <div>📊 Mysterious achievements...</div>
            <div>💝 Interactive surprises...</div>
            <div>🌟 A design that touches the soul...</div>
          </div>
          <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-purple-50 rounded-lg border border-red-200">
            <p className="text-red-600 text-xs font-medium">
              🔒 The full experience remains locked until the countdown reaches zero...
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-red-50 to-purple-50 rounded-2xl p-6 shadow-lg border border-red-200">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            💬 Have Questions?
          </h3>
          <p className="text-gray-600 mb-4">
            For any queries about this special countdown or the upcoming tribute website, 
            feel free to message me on WhatsApp.
          </p>
          <div className="flex items-center justify-center space-x-3">
            <div className="text-2xl">📱</div>
            <a 
              href="https://wa.me/923272667668" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>💬 WhatsApp</span>
              <span className="text-sm">+92 327 266 7668</span>
            </a>
          </div>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-pulse floating-element" style={{"--delay": "0"}}></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-200 rounded-full opacity-25 animate-bounce floating-element" style={{"--delay": "1"}}></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-purple-200 rounded-full opacity-20 animate-ping floating-element" style={{"--delay": "2"}}></div>

        {/* Redirecting Overlay */}
        {isRedirecting && (
          <div className="fixed inset-0 bg-red-500/95 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center text-white">
              <div className="text-6xl mb-6 animate-spin">🔄</div>
              <div className="text-3xl font-medium mb-4">Website Unlocked!</div>
              <div className="text-xl opacity-90">Redirecting to the full tribute website...</div>
              <div className="text-sm opacity-70 mt-2">Please wait while we prepare your experience</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
