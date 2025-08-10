'use client';

import { useState, useEffect } from 'react';

export default function Statistics() {
  const [counts, setCounts] = useState({
    albums: 0,
    countries: 0,
    performances: 0,
    years: 0,
    awards: 0,
    collaborations: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  const targetCounts = {
    albums: 125,
    countries: 40,
    performances: 1000,
    years: 25,
    awards: 15,
    collaborations: 50
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('statistics-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;

    const timer = setInterval(() => {
      setCounts(prev => {
        const newCounts = {};
        let allComplete = true;

        Object.keys(targetCounts).forEach(key => {
          const target = targetCounts[key];
          const current = prev[key];
          const increment = target / steps;

          if (current < target) {
            newCounts[key] = Math.min(current + increment, target);
            allComplete = false;
          } else {
            newCounts[key] = target;
          }
        });

        if (allComplete) {
          clearInterval(timer);
        }

        return newCounts;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  const stats = [
    {
      icon: '💿',
      label: 'Albums',
      value: Math.round(counts.albums),
      suffix: '+',
      description: 'Studio & Live Recordings'
    },
    {
      icon: '🌍',
      label: 'Countries',
      value: Math.round(counts.countries),
      suffix: '+',
      description: 'International Tours'
    },
    {
      icon: '🎭',
      label: 'Performances',
      value: Math.round(counts.performances),
      suffix: '+',
      description: 'Live Shows Worldwide'
    },
    {
      icon: '⏰',
      label: 'Years',
      value: Math.round(counts.years),
      suffix: '',
      description: 'Active Career'
    },
    {
      icon: '🏆',
      label: 'Awards',
      value: Math.round(counts.awards),
      suffix: '+',
      description: 'Recognition & Honors'
    },
    {
      icon: '🤝',
      label: 'Collaborations',
      value: Math.round(counts.collaborations),
      suffix: '+',
      description: 'Artists & Musicians'
    }
  ];

  return (
    <div id="statistics-section" className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
      <div className="text-center mb-12">
        <h4 className="text-2xl font-medium text-gray-800 mb-2">By The Numbers</h4>
        <p className="text-gray-600 text-sm">The extraordinary achievements of a musical legend</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {stat.value.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-lg font-medium text-gray-800 mb-2">
              {stat.label}
            </div>
            <div className="text-sm text-gray-600">
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Highlights */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6">
            <div className="text-2xl mb-2">🎵</div>
            <div className="text-lg font-medium text-gray-800 mb-2">Musical Legacy</div>
            <div className="text-sm text-gray-600">
              Influenced generations of musicians across genres
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6">
            <div className="text-2xl mb-2">🙏</div>
            <div className="text-lg font-medium text-gray-800 mb-2">Spiritual Impact</div>
            <div className="text-sm text-gray-600">
              Brought peace and devotion to millions worldwide
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6">
            <div className="text-2xl mb-2">👑</div>
            <div className="text-lg font-medium text-gray-800 mb-2">Cultural Icon</div>
            <div className="text-sm text-gray-600">
              Represented the best of South Asian heritage
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <p className="text-gray-500 text-sm italic">
          "Numbers can't capture the depth of his impact, but they tell a story of extraordinary dedication and achievement"
        </p>
      </div>
    </div>
  );
}
