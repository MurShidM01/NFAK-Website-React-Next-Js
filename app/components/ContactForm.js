'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
    tribute: '',
    category: 'general'
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/tributes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowPopup(true);
        // Reset form immediately
        setFormData({
          name: '',
          email: '',
          country: '',
          message: '',
          tribute: '',
          category: 'general'
        });
      } else {
        alert(data.error || 'Failed to submit tribute. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting tribute:', error);
      alert('Failed to submit tribute. Please try again.');
    }
  };

  const categories = [
    { value: 'general', label: 'General Message' },
    { value: 'tribute', label: 'Personal Tribute' },
    { value: 'memory', label: 'Memory/Story' },
    { value: 'feedback', label: 'Website Feedback' },
    { value: 'music', label: 'Music Discussion' }
  ];

  const countries = [
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
    { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
    { code: 'IR', name: 'Iran', flag: '🇮🇷' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { code: 'PE', name: 'Peru', flag: '🇵🇪' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
    { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
    { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
    { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
    { code: 'LY', name: 'Libya', flag: '🇱🇾' },
    { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
    { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
    { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
    { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
    { code: 'NA', name: 'Namibia', flag: '🇳🇦' },
    { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
    { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
    { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
    { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
    { code: 'CV', name: 'Cape Verde', flag: '🇨🇻' },
    { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
    { code: 'CI', name: 'Ivory Coast', flag: '🇨🇮' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱' },
    { code: 'NE', name: 'Niger', flag: '🇳🇪' },
    { code: 'TD', name: 'Chad', flag: '🇹🇩' },
    { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
    { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
    { code: 'CG', name: 'Republic of the Congo', flag: '🇨🇬' },
    { code: 'CD', name: 'Democratic Republic of the Congo', flag: '🇨🇩' },
    { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
    { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹' },
    { code: 'AO', name: 'Angola', flag: '🇦🇴' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
    { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
    { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
    { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
    { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
    { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
    { code: 'OTHER', name: 'Other Country', flag: '🌍' }
  ];



  return (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h4 className="text-xl font-medium text-gray-800 mb-2">Share Your Thoughts</h4>
        <p className="text-gray-600 text-sm">Leave a tribute, memory, or message</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
            placeholder="Enter your email (optional)"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Country *
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tribute Message */}
        {formData.category === 'tribute' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Tribute *
            </label>
            <textarea
              name="tribute"
              value={formData.tribute}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              placeholder="Share your personal tribute to Ustad Nusrat Fateh Ali Khan..."
            />
          </div>
        )}

        {/* General Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {formData.category === 'tribute' ? 'Additional Message' : 'Your Message *'}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
            placeholder={
              formData.category === 'tribute' 
                ? 'Any additional thoughts or memories...'
                : 'Share your message, memory, or feedback...'
            }
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Send Message
          </button>
        </div>
      </form>

      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="grid md:grid-cols-3 gap-6 text-center text-sm text-gray-500">
          <div>
            <div className="text-2xl mb-2">💬</div>
            <div>Share Memories</div>
          </div>
          <div>
            <div className="text-2xl mb-2">🙏</div>
            <div>Leave Tributes</div>
          </div>
          <div>
            <div className="text-2xl mb-2">📝</div>
            <div>Give Feedback</div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Need help or have questions?</span>
          </div>
          <div className="text-base font-medium text-amber-600">
            📞 +92 327 266 7668
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Available for any queries about the website or tribute submissions
          </div>
        </div>
      </div>

      {/* Success Popup Dialog */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-in fade-in">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-4xl text-white">✓</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
              <p className="text-gray-600">Your tribute has been submitted successfully</p>
            </div>

            {/* Message */}
            <div className="text-center mb-6">
              <p className="text-gray-700 leading-relaxed">
                Your heartfelt message has been added to our community tributes. 
                Thank you for honoring the legacy of Ustad Nusrat Fateh Ali Khan.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center space-x-2 mb-6">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>

            {/* Close Button */}
            <div className="text-center">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Continue Browsing
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Your tribute will appear in the Community Tributes section below
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
