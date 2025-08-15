'use client';

import { useState, useEffect } from 'react';

export default function AudioTestPage() {
  const [audioInfo, setAudioInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    fetchAudioInfo();
  }, []);

  const fetchAudioInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/audio-test');
      const data = await response.json();
      
      if (response.ok) {
        setAudioInfo(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testAudioFile = async (filePath) => {
    try {
      const response = await fetch(filePath, { method: 'HEAD' });
      const result = {
        file: filePath,
        accessible: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      };
      
      setTestResults(prev => [...prev, result]);
      return result;
    } catch (err) {
      const result = {
        file: filePath,
        accessible: false,
        error: err.message
      };
      setTestResults(prev => [...prev, result]);
      return result;
    }
  };

  const testAllFiles = async () => {
    if (!audioInfo?.files) return;
    
    setTestResults([]);
    for (const file of audioInfo.files) {
      await testAudioFile(file.path);
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
          <p>Loading audio information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h1 className="text-xl font-semibold text-red-800 mb-2">Error</h1>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchAudioInfo}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Audio File Test</h1>
        
        {/* Audio Info */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Audio Directory Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Directory:</strong> {audioInfo?.songsDirectory}
            </div>
            <div>
              <strong>Total Files:</strong> {audioInfo?.totalFiles}
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Audio Files</h2>
            <button 
              onClick={testAllFiles}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test All Files
            </button>
          </div>
          
          <div className="space-y-3">
            {audioInfo?.files?.map((file, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{file.name}</h3>
                    <p className="text-sm text-gray-600">Size: {file.sizeMB} MB</p>
                    <p className="text-sm text-gray-600">Path: {file.path}</p>
                  </div>
                  <button 
                    onClick={() => testAudioFile(file.path)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                  >
                    Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg p-4 ${
                    result.accessible 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{result.file}</h3>
                      <p className={`text-sm ${
                        result.accessible ? 'text-green-600' : 'text-red-600'
                      }`}>
                        Status: {result.accessible ? 'Accessible' : 'Not Accessible'}
                      </p>
                      {result.status && (
                        <p className="text-sm text-gray-600">
                          HTTP: {result.status} {result.statusText}
                        </p>
                      )}
                      {result.error && (
                        <p className="text-sm text-red-600">Error: {result.error}</p>
                      )}
                    </div>
                    <div className={`w-4 h-4 rounded-full ${
                      result.accessible ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manual Test */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Manual Test</h2>
          <p className="text-gray-600 mb-4">
            Try playing one of these audio files directly in your browser:
          </p>
          <div className="space-y-2">
            {audioInfo?.files?.slice(0, 3).map((file, index) => (
              <a 
                key={index}
                href={file.path}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-800 underline"
              >
                {file.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
