'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'countdown', label: 'Countdown', icon: '⏰' },
    { id: 'hero', label: 'Home', icon: '🕊️' },
    { id: 'statistics', label: 'Statistics', icon: '📊' },
    { id: 'timeline', label: 'Timeline', icon: '📅' },
    { id: 'biography', label: 'Biography', icon: '📖' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'gallery', label: 'Gallery', icon: '📸' },
    { id: 'videos', label: 'Videos', icon: '🎥' },
    { id: 'quotes', label: 'Quotes', icon: '💭' },
    { id: 'legacy', label: 'Legacy', icon: '👑' },
    { id: 'contact', label: 'Contact', icon: '💝' },
    { id: 'tributes', label: 'Tributes', icon: '💌' },
    { id: 'admin', label: 'Admin', icon: '⚙️' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling down
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Update active section based on scroll position
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Navigation */}
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 px-4 py-2">
          <div className="flex items-center space-x-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`p-2 rounded-full transition-all duration-200 hover:bg-amber-100 hover:scale-110 ${
                  activeSection === section.id
                    ? 'bg-amber-200 text-amber-800 scale-110'
                    : 'text-gray-600 hover:text-amber-600'
                }`}
                title={section.label}
              >
                <span className="text-sm">{section.icon}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
        }`}
        title="Scroll to Top"
      >
        <span className="text-lg">⬆️</span>
      </button>


    </>
  );
}
