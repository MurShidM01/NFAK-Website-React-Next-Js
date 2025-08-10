'use client';

import { useState } from 'react';

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    {
      id: 1,
      title: "Live Performance",
      description: "Ustad Nusrat Fateh Ali Khan performing at Royal Albert Hall",
      category: "Performance",
      year: "1988"
    },
    {
      id: 2,
      title: "Studio Session",
      description: "Recording session for one of his iconic albums",
      category: "Studio",
      year: "1990"
    },
    {
      id: 3,
      title: "International Tour",
      description: "Performing for global audiences",
      category: "Tour",
      year: "1992"
    },
    {
      id: 4,
      title: "Traditional Attire",
      description: "In traditional Qawwali dress",
      category: "Portrait",
      year: "1995"
    },
    {
      id: 5,
      title: "Concert Hall",
      description: "Historic performance venue",
      category: "Venue",
      year: "1996"
    },
    {
      id: 6,
      title: "Musical Legacy",
      description: "Teaching and sharing his knowledge",
      category: "Legacy",
      year: "1997"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Performance: "bg-blue-100 text-blue-800",
      Studio: "bg-green-100 text-green-800",
      Tour: "bg-purple-100 text-purple-800",
      Portrait: "bg-pink-100 text-pink-800",
      Venue: "bg-amber-100 text-amber-800",
      Legacy: "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h4 className="text-xl font-medium text-gray-800 mb-2">Photo Gallery</h4>
        <p className="text-gray-600 text-sm">Capturing moments from his extraordinary journey</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div 
            key={photo.id}
            className="group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 h-48 flex flex-col items-center justify-center text-center hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="text-4xl text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                📸
              </div>
              <h5 className="font-medium text-gray-800 mb-2 text-sm">
                {photo.title}
              </h5>
              <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                {photo.description}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(photo.category)}`}>
                  {photo.category}
                </span>
                <span className="text-xs text-gray-500">{photo.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl text-amber-400 mb-4">📸</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedPhoto.description}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedPhoto.category)}`}>
                  {selectedPhoto.category}
                </span>
                <span className="text-sm text-gray-500">{selectedPhoto.year}</span>
              </div>
              <button 
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                onClick={() => setSelectedPhoto(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
          View More Photos →
        </button>
      </div>
    </div>
  );
}
