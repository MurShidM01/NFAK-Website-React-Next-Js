'use client';

import { useState, useEffect } from 'react';

export default function TributesDisplay() {
  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const tributesPerPage = 1;

  useEffect(() => {
    fetchTributes();
  }, []);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const fetchTributes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tributes');
      const data = await response.json();
      
      if (response.ok) {
        setTributes(data.tributes || []);
      } else {
        setError(data.error || 'Failed to fetch tributes');
      }
    } catch (error) {
      setError('Failed to fetch tributes');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      tribute: '🙏',
      memory: '💭',
      general: '💬',
      feedback: '📝',
      music: '🎵'
    };
    return icons[category] || '💬';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      tribute: 'Personal Tribute',
      memory: 'Memory/Story',
      general: 'General Message',
      feedback: 'Website Feedback',
      music: 'Music Discussion'
    };
    return labels[category] || 'General Message';
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCountryFlag = (countryCode) => {
    const countries = {
      'PK': '🇵🇰', 'IN': '🇮🇳', 'BD': '🇧🇩', 'AF': '🇦🇫', 'IR': '🇮🇷', 'TR': '🇹🇷',
      'AE': '🇦🇪', 'SA': '🇸🇦', 'GB': '🇬🇧', 'US': '🇺🇸', 'CA': '🇨🇦', 'AU': '🇦🇺',
      'DE': '🇩🇪', 'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸', 'NL': '🇳🇱', 'SE': '🇸🇪',
      'NO': '🇳🇴', 'DK': '🇩🇰', 'FI': '🇫🇮', 'CH': '🇨🇭', 'AT': '🇦🇹', 'BE': '🇧🇪',
      'IE': '🇮🇪', 'NZ': '🇳🇿', 'JP': '🇯🇵', 'KR': '🇰🇷', 'CN': '🇨🇳', 'SG': '🇸🇬',
      'MY': '🇲🇾', 'TH': '🇹🇭', 'VN': '🇻🇳', 'PH': '🇵🇭', 'ID': '🇮🇩', 'BR': '🇧🇷',
      'AR': '🇦🇷', 'MX': '🇲🇽', 'CO': '🇨🇴', 'PE': '🇵🇪', 'CL': '🇨🇱', 'ZA': '🇿🇦',
      'EG': '🇪🇬', 'MA': '🇲🇦', 'TN': '🇹🇳', 'DZ': '🇩🇿', 'LY': '🇱🇾', 'SD': '🇸🇩',
      'ET': '🇪🇹', 'KE': '🇰🇪', 'NG': '🇳🇬', 'GH': '🇬🇭', 'UG': '🇺🇬', 'TZ': '🇹🇿',
      'ZM': '🇿🇲', 'ZW': '🇿🇼', 'BW': '🇧🇼', 'NA': '🇳🇦', 'MZ': '🇲🇿', 'MG': '🇲🇬',
      'MU': '🇲🇺', 'SC': '🇸🇨', 'CV': '🇨🇻', 'GW': '🇬🇼', 'SL': '🇸🇱', 'LR': '🇱🇷',
      'CI': '🇨🇮', 'BF': '🇧🇫', 'ML': '🇲🇱', 'NE': '🇳🇪', 'TD': '🇹🇩', 'CM': '🇨🇲',
      'CF': '🇨🇫', 'CG': '🇨🇬', 'CD': '🇨🇩', 'GA': '🇬🇦', 'GQ': '🇬🇶', 'ST': '🇸🇹',
      'AO': '🇦🇴', 'RW': '🇷🇼', 'BI': '🇧🇮', 'DJ': '🇩🇯', 'SO': '🇸🇴', 'ER': '🇪🇷',
      'SS': '🇸🇸', 'OTHER': '🌍'
    };
    return countries[countryCode] || '🌍';
  };

  const getCountryName = (countryCode) => {
    const countries = {
      'PK': 'Pakistan', 'IN': 'India', 'BD': 'Bangladesh', 'AF': 'Afghanistan', 'IR': 'Iran', 'TR': 'Turkey',
      'AE': 'United Arab Emirates', 'SA': 'Saudi Arabia', 'GB': 'United Kingdom', 'US': 'United States', 'CA': 'Canada', 'AU': 'Australia',
      'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands', 'SE': 'Sweden',
      'NO': 'Norway', 'DK': 'Denmark', 'FI': 'Finland', 'CH': 'Switzerland', 'AT': 'Austria', 'BE': 'Belgium',
      'IE': 'Ireland', 'NZ': 'New Zealand', 'JP': 'Japan', 'KR': 'South Korea', 'CN': 'China', 'SG': 'Singapore',
      'MY': 'Malaysia', 'TH': 'Thailand', 'VN': 'Vietnam', 'PH': 'Philippines', 'ID': 'Indonesia', 'BR': 'Brazil',
      'AR': 'Argentina', 'MX': 'Mexico', 'CO': 'Colombia', 'PE': 'Peru', 'CL': 'Chile', 'ZA': 'South Africa',
      'EG': 'Egypt', 'MA': 'Morocco', 'TN': 'Tunisia', 'DZ': 'Algeria', 'LY': 'Libya', 'SD': 'Sudan',
      'ET': 'Ethiopia', 'KE': 'Kenya', 'NG': 'Nigeria', 'GH': 'Ghana', 'UG': 'Uganda', 'TZ': 'Tanzania',
      'ZM': 'Zambia', 'ZW': 'Zimbabwe', 'BW': 'Botswana', 'NA': 'Namibia', 'MZ': 'Mozambique', 'MG': 'Madagascar',
      'MU': 'Mauritius', 'SC': 'Seychelles', 'CV': 'Cape Verde', 'GW': 'Guinea-Bissau', 'SL': 'Sierra Leone', 'LR': 'Liberia',
      'CI': 'Ivory Coast', 'BF': 'Burkina Faso', 'ML': 'Mali', 'NE': 'Niger', 'TD': 'Chad', 'CM': 'Cameroon',
      'CF': 'Central African Republic', 'CG': 'Republic of the Congo', 'CD': 'Democratic Republic of the Congo', 'GA': 'Gabon', 'GQ': 'Equatorial Guinea', 'ST': 'São Tomé and Príncipe',
      'AO': 'Angola', 'RW': 'Rwanda', 'BI': 'Burundi', 'DJ': 'Djibouti', 'SO': 'Somalia', 'ER': 'Eritrea',
      'SS': 'South Sudan', 'OTHER': 'Other Country'
    };
    return countries[countryCode] || 'Other Country';
  };

  const filteredTributes = selectedCategory === 'all' 
    ? tributes 
    : tributes.filter(tribute => tribute.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredTributes.length / tributesPerPage);
  const startIndex = (currentPage - 1) * tributesPerPage;
  const endIndex = startIndex + tributesPerPage;
  const currentTributes = filteredTributes.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-gray-600">Loading tributes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">❌</div>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchTributes}
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (tributes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">💭</div>
        <p className="text-gray-600 mb-4">No tributes yet. Be the first to share your thoughts!</p>
        <p className="text-sm text-gray-500">Your tribute will appear here once submitted.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({tributes.length})
        </button>
        {['tribute', 'memory', 'general', 'feedback', 'music'].map(category => {
          const count = tributes.filter(t => t.category === category).length;
          if (count === 0) return null;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getCategoryIcon(category)} {getCategoryLabel(category)} ({count})
            </button>
          );
        })}
      </div>

      {/* Tributes Grid */}
      <div className="grid gap-6">
        {currentTributes.map((tribute) => (
          <div key={tribute.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getCategoryIcon(tribute.category)}</div>
                <div>
                  <h4 className="font-medium text-gray-800">{tribute.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{getCategoryLabel(tribute.category)}</span>
                    <span>•</span>
                    <span>{formatDate(tribute.timestamp)}</span>
                  </div>
                  {/* Country Display */}
                  {tribute.country && (
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-lg">{getCountryFlag(tribute.country)}</span>
                      <span className="text-xs text-gray-600">{getCountryName(tribute.country)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {tribute.tribute && (
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">Personal Tribute:</h5>
                <p className="text-gray-600 italic">"{tribute.tribute}"</p>
              </div>
            )}

            <div className="mb-4">
              <h5 className="font-medium text-gray-700 mb-2">Message:</h5>
              <p className="text-gray-600 leading-relaxed">{tribute.message}</p>
            </div>

            {tribute.email && (
              <div className="text-sm text-gray-500">
                <span className="font-medium">Contact:</span> {tribute.email}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center space-y-4">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Showing tribute {startIndex + 1} of {filteredTributes.length} 
            {filteredTributes.length > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </div>
          
          {/* Pagination Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              ← Previous
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                const isCurrentPage = page === currentPage;
                
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isCurrentPage
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 || 
                  page === currentPage + 2
                ) {
                  return <span key={page} className="px-2 text-gray-400">...</span>;
                }
                return null;
              })}
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="text-center pt-6">
        <button
          onClick={fetchTributes}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          🔄 Refresh Tributes
        </button>
      </div>
    </div>
  );
}
