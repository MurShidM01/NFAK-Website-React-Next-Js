'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from "next/image";
import CountdownTimer from "./components/CountdownTimer";
import MusicPlayer from "./components/MusicPlayer";
import AchievementsTimeline from "./components/AchievementsTimeline";
import PhotoGallery from "./components/PhotoGallery";
import VideoGallery from "./components/VideoGallery";
import Quotes from "./components/Quotes";
import ContactForm from "./components/ContactForm";
import Navigation from "./components/Navigation";
import Statistics from "./components/Statistics";
import LandingPage from "./components/LandingPage";
import TributesDisplay from "./components/TributesDisplay";

function HomeContent() {
  const searchParams = useSearchParams();
  const isUnlocked = searchParams.get('unlock') === 'true';
  
  // TEMPORARY: For development, always show full website
  // Remove this line when you want to restore the countdown functionality
  const forceUnlock = true;

  // If not unlocked, show only the landing page
  if (!isUnlocked && !forceUnlock) {
    return <LandingPage />;
  }

  // If unlocked, show the full website
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <header className="py-6 sm:py-8 px-4 sm:px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-light text-gray-800 mb-2">
            Ustad Nusrat Fateh Ali Khan
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Shahenshah-e-Qawwali • The Voice of the Soul
          </p>
        </div>
      </header>




      {/* Countdown Timers */}
      <section id="countdown" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute top-10 left-10 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-amber-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-12 sm:w-20 lg:w-24 h-12 sm:h-20 lg:h-24 bg-orange-200 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-14 sm:w-24 lg:w-28 h-14 sm:h-24 lg:h-28 bg-yellow-200 rounded-full opacity-10 animate-ping"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 gentle-float">⏰</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-800 mb-3 sm:mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Sacred Moments
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Every second brings us closer to honoring the eternal legacy of the Shahenshah-e-Qawwali. 
              These countdowns remind us of the precious moments we share in his memory.
            </p>
            <div className="mt-4 sm:mt-6">
              <div className="inline-flex items-center space-x-2 text-amber-600">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm font-medium">Live Countdown</span>
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{"animation-delay": "0.5s"}}></span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="transform hover:scale-105 transition-transform duration-500">
              <CountdownTimer
                targetDate="08-16"
                title="Death Anniversary"
                type="death"
              />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-500">
              <CountdownTimer
                targetDate="10-13"
                title="Birthday"
                type="birthday"
              />
            </div>
          </div>
          
          {/* Bottom Decorative Element */}
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <div className="inline-flex items-center space-x-2 sm:space-x-4 text-gray-500">
              <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <span className="text-xs sm:text-sm font-medium">🕊️ Eternal Memory 🕊️</span>
              <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section id="hero" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">🕊️</div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-800 mb-4 sm:mb-6">
            Eternal Voice of Devotion
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 px-4">
            A tribute to the legendary Qawwali maestro whose voice transcended boundaries, 
            touching millions of hearts with divine melodies and spiritual devotion.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 px-4">
            <span>🎵 125+ Albums</span>
            <span>🌍 40+ Countries</span>
            <span>🎭 1000+ Performances</span>
            <span>👑 Shahenshah-e-Qawwali</span>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <Statistics />
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-light text-gray-800 text-center mb-8 sm:mb-12">
            Life Journey
          </h3>
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-semibold text-sm sm:text-base mx-auto sm:mx-0">
                1948
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Birth in Faisalabad</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Born into a family of Qawwali musicians, Nusrat Fateh Ali Khan was destined to carry forward 
                  the centuries-old tradition of devotional music.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-semibold text-sm sm:text-base mx-auto sm:mx-0">
                1965
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2">First Public Performance</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Made his debut as a Qawwali performer at the age of 17, marking the beginning of an 
                  extraordinary musical journey.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-semibold text-sm sm:text-base mx-auto sm:mx-0">
                1985
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Global Recognition</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Performed at the WOMAD Festival, introducing Qawwali to Western audiences and gaining 
                  international acclaim.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-semibold text-sm sm:text-base mx-auto sm:mx-0">
                1997
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Eternal Departure</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Left this world on August 16, 1997, but his voice continues to echo in the hearts of 
                  millions worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section id="biography" className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-light text-gray-800 text-center mb-8 sm:mb-12">
            The Legend
          </h3>
          
          {/* Early Life & Family */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">👨‍👦</div>
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">Family Heritage</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Born on October 13, 1948, in Faisalabad, Pakistan, Nusrat Fateh Ali Khan was the fifth child 
                of Ustad Fateh Ali Khan. His family had been performing Qawwali for over 600 years, tracing 
                their lineage back to the 13th century. His grandfather, Ustad Bade Ghulam Ali Khan, was also 
                a renowned Qawwali performer.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🎵</div>
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">Musical Training</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                From the age of 9, Nusrat began learning the art of Qawwali under his father's guidance. 
                He mastered the complex rhythms of tabla, harmonium, and the intricate vocal techniques that 
                would later become his signature style. His training included classical ragas and traditional 
                Sufi poetry.
              </p>
            </div>
          </div>

          {/* Musical Journey */}
          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 sm:mb-12">
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🌟</div>
              <h4 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 sm:mb-3">Musical Evolution</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl mb-2">🎭</div>
                <h5 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Traditional Roots</h5>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Began with classical Qawwali, mastering the traditional forms and spiritual essence 
                  of Sufi devotional music.
                </p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl mb-2">🌍</div>
                <h5 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Global Fusion</h5>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Innovated by blending traditional Qawwali with Western instruments, creating 
                  cross-cultural musical bridges.
                </p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl mb-2">🎼</div>
                <h5 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Contemporary Influence</h5>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Inspired countless artists across genres, from rock and jazz to electronic and world music.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Qualities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🙏</div>
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">Spiritual Depth</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Nusrat was deeply spiritual, often spending hours in meditation and prayer before performances. 
                His connection to the divine was evident in every note he sang. He believed that music was 
                a direct path to God and that his voice was a divine gift to be used for spiritual elevation.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">💝</div>
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">Humility & Generosity</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Despite his global fame, Nusrat remained humble and approachable. He was known for his 
                generosity, often performing for free at religious gatherings and helping struggling musicians. 
                His kindness extended beyond music to humanitarian causes.
              </p>
            </div>
          </div>

          {/* Legacy & Impact */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 sm:p-8 text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">👑</div>
            <h4 className="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">Eternal Legacy</h4>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Today, Ustad Nusrat Fateh Ali Khan's legacy lives on through his recordings, the countless 
              musicians he inspired, and the millions of hearts he touched with his divine voice. He is 
              remembered not just as a musician, but as a spiritual guide who used music as a bridge 
              between humanity and the divine.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div>🎵 125+ Albums</div>
              <div>🌍 40+ Countries</div>
              <div>🎭 1000+ Performances</div>
              <div>🙏 Spiritual Guide</div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section id="music" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-light text-gray-800 text-center mb-8 sm:mb-12">
            Musical Legacy
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 sm:p-8 text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎼</div>
              <h4 className="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">Listen to Qawwali</h4>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Experience the timeless melodies that have touched millions of souls across the world. 
                From soul-stirring devotional pieces to heart-wrenching expressions of divine love.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-4">
                <div>🎵 8 Classic Qawwalis</div>
                <div>⏱️ Full Length Versions</div>
                <div>🎭 Live Performance Style</div>
                <div>🙏 Spiritual Experience</div>
              </div>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                <div>🎵 Kab Yaad Mein Tera Saath Nahin</div>
                <div>🎵 Kahan Aake Rukne Teh Raste</div>
                <div>🎵 Maikadah Bhi Apna Hai</div>
                <div>🎵 Jis Dil Wich Sajnan Vas Jaiye</div>
              </div>
              
              {/* Audio Test Link */}
              <div className="mt-6 pt-4 border-t border-amber-200">
                <a 
                  href="/audio-test" 
                  className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
                >
                  🔧 Audio Troubleshooting
                </a>
                <p className="text-xs text-amber-700 mt-2">
                  Having issues? Test audio files here
                </p>
              </div>
            </div>
            <MusicPlayer />
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section id="achievements" className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-light text-gray-800 text-center mb-8 sm:mb-12">
            Career Achievements
          </h3>
          <AchievementsTimeline />
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <PhotoGallery />
        </div>
      </section>

      {/* Video Gallery Section */}
      <section id="videos" className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <VideoGallery />
        </div>
      </section>

      {/* Quotes Section */}
      <section id="quotes" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Quotes />
        </div>
      </section>

      {/* Legacy & Impact */}
      <section id="legacy" className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-light text-gray-800 text-center mb-8 sm:mb-12">
            Legacy & Impact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🌍</div>
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">Global Influence</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Introduced Qawwali to international audiences, influencing musicians across genres 
                and cultures worldwide.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🎵</div>
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">Musical Innovation</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Revolutionized traditional Qawwali with his unique vocal style and emotional depth, 
                setting new standards for devotional music.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🙏</div>
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">Spiritual Bridge</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Connected people of different faiths and cultures through the universal language 
                of music and devotion.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">👑</div>
              <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">Cultural Icon</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Became a symbol of Pakistani culture and Sufi tradition, representing the best 
                of South Asian musical heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Tributes Section */}
      <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-light text-gray-800 text-center mb-8 sm:mb-12">
            Share Your Tribute
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 sm:p-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💝</div>
                <h4 className="text-lg sm:text-xl font-medium text-gray-800 mb-3 sm:mb-4">Leave Your Message</h4>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Share your memories, tributes, or thoughts about Ustad Nusrat Fateh Ali Khan. 
                  Your words help keep his legacy alive and connect with fellow admirers worldwide.
                </p>
                
                {/* Enhanced Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="text-left">
                    <h5 className="font-medium text-gray-800 mb-2 text-sm">🎵 Musical Memories</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• First time hearing his voice</li>
                      <li>• Favorite qawwali performance</li>
                      <li>• How his music changed your life</li>
                      <li>• Spiritual experiences through his songs</li>
                    </ul>
                  </div>
                  <div className="text-left">
                    <h5 className="font-medium text-gray-800 mb-2 text-sm">🙏 Personal Tributes</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• What he means to you</li>
                      <li>• Lessons learned from his music</li>
                      <li>• Cultural impact on your life</li>
                      <li>• Messages to his family</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                  <div>✨ Share personal memories</div>
                  <div>✨ Leave heartfelt tributes</div>
                  <div>✨ Discuss his music</div>
                  <div>✨ Provide feedback</div>
                  <div>✨ Connect with global community</div>
                </div>

                {/* Global Community Info */}
                <div className="mt-4 pt-4 border-t border-amber-200">
                  <p className="text-xs text-amber-700 font-medium">
                    🌍 Join thousands of fans from around the world in honoring his legacy
                  </p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* All Tributes Display Section */}
      <section id="tributes" className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-light text-gray-800 text-center mb-8 sm:mb-12">
            Community Tributes
          </h3>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Read heartfelt tributes and messages from people around the world who have been touched by 
            Ustad Nusrat Fateh Ali Khan's divine voice and spiritual music.
          </p>
          <TributesDisplay />
        </div>
      </section>

      {/* Eternal Tribute */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">🕊️</div>
          <h3 className="text-2xl sm:text-3xl font-light text-gray-800 mb-4 sm:mb-6">
            Eternal Rest in Peace
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 px-4">
            Though you left this world on August 16, 1997, your voice continues to echo in our hearts. 
            Your music remains a source of peace, inspiration, and spiritual connection for millions.
          </p>
          <div className="text-amber-600 text-base sm:text-lg font-medium px-4">
            "Allah Hoo Allah Hoo" - Your voice still calls to the divine
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl mb-4">🕊️</div>
          <p className="text-gray-600 mb-4">
            In loving memory of Ustad Nusrat Fateh Ali Khan
          </p>
          <p className="text-sm text-gray-500">
            1948 - 1997 • Shahenshah-e-Qawwali • The Voice of the Soul
          </p>
          
          {/* Contact Information */}
          <div className="mt-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Questions or need help?</span>
            </p>
            <p className="text-base font-medium text-amber-600">
              📞 +92 327 266 7668
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Available for any queries about the website or tribute submissions
            </p>
          </div>
          
          <div className="mt-6 text-xs text-gray-400">
            This tribute website honors the legacy of one of the greatest voices in music history.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LandingPage />}>
      <HomeContent />
    </Suspense>
  );
}
