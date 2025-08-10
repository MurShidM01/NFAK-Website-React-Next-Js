'use client';

import { useState } from 'react';

export default function Quotes() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = [
    {
      text: "Music is the language of the soul. When I sing, I feel connected to something divine.",
      context: "Interview with BBC, 1995",
      category: "Philosophy"
    },
    {
      text: "Qawwali is not just music; it's a spiritual journey that takes you closer to God.",
      context: "Documentary 'The Last Prophet', 1996",
      category: "Spirituality"
    },
    {
      text: "Every note I sing is a prayer, every melody a meditation.",
      context: "Concert introduction, Royal Albert Hall, 1988",
      category: "Devotion"
    },
    {
      text: "The voice is God's gift, and I use it to spread love and peace.",
      context: "Interview with Time Magazine, 1994",
      category: "Purpose"
    },
    {
      text: "Music has no boundaries. It speaks to every heart, regardless of language or religion.",
      context: "WOMAD Festival speech, 1985",
      category: "Unity"
    },
    {
      text: "When I perform, I forget everything else. It's just me and the divine connection.",
      context: "Backstage interview, Carnegie Hall, 1995",
      category: "Performance"
    },
    {
      text: "The greatest reward is when someone tells me my music brought them peace.",
      context: "Radio interview, Pakistan, 1993",
      category: "Impact"
    },
    {
      text: "Qawwali is the bridge between the material and spiritual world.",
      context: "Lecture at University of London, 1992",
      category: "Philosophy"
    }
  ];

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Philosophy': "bg-blue-100 text-blue-800",
      'Spirituality': "bg-purple-100 text-purple-800",
      'Devotion': "bg-amber-100 text-amber-800",
      'Purpose': "bg-green-100 text-green-800",
      'Unity': "bg-pink-100 text-pink-800",
      'Performance': "bg-indigo-100 text-indigo-800",
      'Impact': "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h4 className="text-xl font-medium text-gray-800 mb-2">Wisdom & Quotes</h4>
        <p className="text-gray-600 text-sm">Inspiring words from the Shahenshah-e-Qawwali</p>
      </div>

      {/* Main Quote Display */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-8 mb-8 text-center">
        <div className="text-6xl text-amber-400 mb-6">💭</div>
        <blockquote className="text-xl text-gray-800 mb-6 italic leading-relaxed">
          "{quotes[currentQuoteIndex].text}"
        </blockquote>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(quotes[currentQuoteIndex].category)}`}>
            {quotes[currentQuoteIndex].category}
          </span>
        </div>
        <p className="text-gray-600 text-sm">
          — {quotes[currentQuoteIndex].context}
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center space-x-4 mb-8">
        <button
          onClick={prevQuote}
          className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          ⏮️
        </button>
        <div className="text-sm text-gray-500">
          {currentQuoteIndex + 1} of {quotes.length}
        </div>
        <button
          onClick={nextQuote}
          className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          ⏭️
        </button>
      </div>

      {/* Quote Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {Array.from(new Set(quotes.map(q => q.category))).map((category) => (
          <div
            key={category}
            className={`px-3 py-2 rounded-lg text-center text-sm font-medium cursor-pointer transition-colors ${
              quotes[currentQuoteIndex].category === category
                ? 'bg-amber-200 text-amber-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => {
              const index = quotes.findIndex(q => q.category === category);
              if (index !== -1) setCurrentQuoteIndex(index);
            }}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Random Quote Button */}
      <div className="text-center">
        <button
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setCurrentQuoteIndex(randomIndex);
          }}
          className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
        >
          🎲 Random Quote
        </button>
      </div>

      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <p className="text-gray-500 text-sm">
          "Words have power, and his words continue to inspire generations"
        </p>
      </div>
    </div>
  );
}
