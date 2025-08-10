'use client';

import { useState } from 'react';

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: "Allah Hoo Allah Hoo - Live Performance",
      description: "Iconic performance at Royal Albert Hall, London",
      duration: "15:32",
      views: "2.5M",
      year: "1988",
      category: "Live Performance"
    },
    {
      id: 2,
      title: "Tumhe Dillagi Bhool Jaani Padegi",
      description: "Emotional rendition from his greatest hits",
      duration: "18:45",
      views: "1.8M",
      year: "1990",
      category: "Classic"
    },
    {
      id: 3,
      title: "Mere Rashke Qamar - Studio Version",
      description: "Studio recording session highlights",
      duration: "22:18",
      views: "3.2M",
      year: "1992",
      category: "Studio"
    },
    {
      id: 4,
      title: "Sanu Ik Pal Chain Na Aave",
      description: "Heartfelt devotional performance",
      duration: "19:27",
      views: "2.1M",
      year: "1995",
      category: "Devotional"
    },
    {
      id: 5,
      title: "Interview with Ustad Nusrat",
      description: "Rare interview about his musical journey",
      duration: "12:45",
      views: "890K",
      year: "1996",
      category: "Interview"
    },
    {
      id: 6,
      title: "Tribute Concert",
      description: "Musicians paying homage to the legend",
      duration: "45:20",
      views: "1.5M",
      year: "1998",
      category: "Tribute"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Live Performance': "bg-blue-100 text-blue-800",
      'Classic': "bg-green-100 text-green-800",
      'Studio': "bg-purple-100 text-purple-800",
      'Devotional': "bg-amber-100 text-amber-800",
      'Interview': "bg-pink-100 text-pink-800",
      'Tribute': "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h4 className="text-xl font-medium text-gray-800 mb-2">Video Gallery</h4>
        <p className="text-gray-600 text-sm">Experience the magic through video performances</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 h-48 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="text-4xl text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                🎥
              </div>
              <h5 className="font-medium text-gray-800 mb-2 text-sm">
                {video.title}
              </h5>
              <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                {video.description}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(video.category)}`}>
                  {video.category}
                </span>
                <span className="text-xs text-gray-500">{video.year}</span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>⏱️ {video.duration}</span>
                <span>👁️ {video.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl text-amber-400 mb-4">🎥</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedVideo.description}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedVideo.category)}`}>
                  {selectedVideo.category}
                </span>
                <span className="text-sm text-gray-500">{selectedVideo.year}</span>
              </div>
              <div className="flex items-center justify-center space-x-4 mb-4 text-sm text-gray-500">
                <span>⏱️ {selectedVideo.duration}</span>
                <span>👁️ {selectedVideo.views}</span>
              </div>
              <button
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                onClick={() => setSelectedVideo(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
          View More Videos →
        </button>
      </div>
    </div>
  );
}
