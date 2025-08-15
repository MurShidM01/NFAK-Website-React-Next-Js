'use client';

import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  const tracks = [
    {
      id: 1,
      title: "Kab Yaad Mein Tera Saath Nahin",
      filename: "Kab Yaad Mein Tera Saath Nahin _ Ustad Nusrat Fateh Ali Khan _ complete full version _ OSA Worldwide(M4A_128K).m4a",
      duration: "00:00",
      year: "Classic",
      album: "Qawwali Collection"
    },
    {
      id: 2,
      title: "Kahan Aake Rukne Teh Raste",
      filename: "Kahan Aake Rukne Teh Raste _ Ustad Nusrat Fateh Ali Khan _ official Complete Version _ OSA Worldwide(M4A_128K).m4a",
      duration: "00:00",
      year: "Classic",
      album: "Qawwali Collection"
    },
    {
      id: 3,
      title: "Maikadah Bhi Apna Hai",
      filename: "Maikadah Bhi Apna Hai _ Ustad Nusrat Fateh Ali Khan _ official Complete Version _ OSA Worldwide(M4A_128K).m4a",
      duration: "00:00",
      year: "Classic",
      album: "Qawwali Collection"
    },
    {
      id: 4,
      title: "Jis Dil Wich Sajnan Vas Jaiye",
      filename: "Jis Dil Wich Sajnan Vas Jaiye _ Ustad Nusrat Fateh Ali Khan _ OSA Worldwide(M4A_128K).m4a",
      duration: "00:00",
      year: "Classic",
      album: "Qawwali Collection"
    },
    {
      id: 5,
      title: "Kab Tak Too Oonchi Awaz Mein",
      filename: "Kab Tak Too Oonchi Awaz Mein _ Ustad Nusrat Fateh Ali Khan _ Complete Version _ OSA Worldwide(M4A_128K).m4a",
      duration: "00:00",
      year: "Classic",
      album: "Qawwali Collection"
    },
    {
      id: 6,
      title: "Maikhaney Anpol Giya Wan",
      filename: "Maikhaney Anpol Giya Wan _ Nusrat Fateh Ali Khan _ official HD video _ OSA Worldwide(M4A_128K).m4a",
      duration: "00:00",
      year: "Classic",
      album: "Qawwali Collection"
    },
    {
      id: 7,
      title: "Jis Simt Dekhon",
      filename: "Jis Simt Dekhon _ Nusrat Fateh Ali Khan _ complete full version _ official HD video _ OSA Worldwide(M4A_128K).m4a",
      duration: "00:00",
      year: "Classic",
      album: "Qawwali Collection"
    },
    {
      id: 8,
      title: "Kabhi Dil Se Na Tera Dard",
      filename: "Kabhi Dil Se Na Tera Dard _ Nusrat Fateh Ali Khan _ complete full version _ OSA Worldwide(M4A_128K).m4a",
      duration: "00:00",
      year: "Classic",
      album: "Qawwali Collection"
    }
  ];

  const loadAudio = async (trackIndex) => {
    if (!audioRef.current) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const audioUrl = `/songs/${tracks[trackIndex].filename}`;
      console.log('Loading audio:', audioUrl);
      
      // Test if the audio file is accessible
      const response = await fetch(audioUrl, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error(`Audio file not found: ${response.status} ${response.statusText}`);
      }
      
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      
      // Wait for audio to be ready
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Audio loading timeout')), 10000);
        
        const handleCanPlay = () => {
          clearTimeout(timeout);
          audioRef.current.removeEventListener('canplay', handleCanPlay);
          audioRef.current.removeEventListener('error', handleError);
          resolve();
        };
        
        const handleError = (e) => {
          clearTimeout(timeout);
          audioRef.current.removeEventListener('canplay', handleCanPlay);
          audioRef.current.removeEventListener('error', handleError);
          reject(new Error(`Audio error: ${e.target.error?.message || 'Unknown error'}`));
        };
        
        audioRef.current.addEventListener('canplay', handleCanPlay);
        audioRef.current.addEventListener('error', handleError);
      });
      
      setAudioLoaded(true);
      setIsLoading(false);
      
    } catch (err) {
      console.error('Audio loading error:', err);
      setError(err.message);
      setIsLoading(false);
      setAudioLoaded(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      // Remove old event listeners
      const audio = audioRef.current;
      
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        tracks[currentTrack].duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        nextTrack();
      };

      const handleError = (e) => {
        console.error('Audio playback error:', e);
        setError(`Playback error: ${e.target.error?.message || 'Unknown error'}`);
        setIsPlaying(false);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      // Load the new track
      loadAudio(currentTrack);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [currentTrack]);

  const togglePlay = async () => {
    if (!audioRef.current || !audioLoaded) {
      console.log('Audio not ready, attempting to load...');
      await loadAudio(currentTrack);
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Check if audio is ready
        if (audioRef.current.readyState < 2) {
          console.log('Audio not ready, waiting...');
          setIsLoading(true);
          await new Promise((resolve) => {
            const handleCanPlay = () => {
              audioRef.current.removeEventListener('canplay', handleCanPlay);
              resolve();
            };
            audioRef.current.addEventListener('canplay', handleCanPlay);
          });
          setIsLoading(false);
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Playback error:', err);
      setError(`Playback failed: ${err.message}`);
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
    setAudioLoaded(false);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
    setAudioLoaded(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !audioLoaded) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = percent * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleTrackChange = (index) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    setAudioLoaded(false);
  };

  const retryLoad = () => {
    setError(null);
    loadAudio(currentTrack);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">🎵</div>
        <h4 className="text-xl font-medium text-gray-800 mb-2">Musical Legacy</h4>
        <p className="text-gray-600 text-sm">Timeless qawwalis by Ustad Nusrat Fateh Ali Khan</p>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-red-800 text-sm">
              <strong>Error:</strong> {error}
            </div>
            <button 
              onClick={retryLoad}
              className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="text-blue-800 text-sm text-center">
            <div className="animate-spin inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
            Loading audio...
          </div>
        </div>
      )}

      {/* Current Track Display */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-6">
        <div className="text-center">
          <h5 className="text-lg font-medium text-gray-800 mb-2">
            {tracks[currentTrack].title}
          </h5>
          <p className="text-gray-600 text-sm mb-2">
            {tracks[currentTrack].album} • {tracks[currentTrack].year}
          </p>
          <p className="text-amber-600 font-medium">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
          {!audioLoaded && !isLoading && !error && (
            <p className="text-orange-600 text-xs mt-1">Click play to load audio</p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div 
          className={`w-full bg-gray-200 rounded-full h-2 ${
            audioLoaded ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
          }`}
          onClick={audioLoaded ? handleSeek : undefined}
        >
          <div 
            className="bg-amber-600 h-2 rounded-full transition-all duration-100"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        <button 
          onClick={prevTrack}
          disabled={isLoading}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isLoading 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          ⏮️
        </button>
        
        <button 
          onClick={togglePlay}
          disabled={isLoading}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-amber-600 hover:bg-amber-700'
          }`}
        >
          <span className={`text-2xl ${
            isLoading ? 'text-gray-600' : 'text-white'
          }`}>
            {isLoading ? '⏳' : isPlaying ? '⏸️' : '▶️'}
          </span>
        </button>
        
        <button 
          onClick={nextTrack}
          disabled={isLoading}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isLoading 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          ⏭️
        </button>
      </div>

      {/* Debug Info (remove in production) */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs text-gray-600">
        <div>Audio Loaded: {audioLoaded ? 'Yes' : 'No'}</div>
        <div>Current Track: {currentTrack + 1}/{tracks.length}</div>
        <div>Ready State: {audioRef.current?.readyState || 'N/A'}</div>
        <div>Network State: {audioRef.current?.networkState || 'N/A'}</div>
      </div>

      {/* Track List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {tracks.map((track, index) => (
          <div 
            key={track.id}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              index === currentTrack 
                ? 'bg-amber-100 border border-amber-200' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => handleTrackChange(index)}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="font-medium text-gray-800 text-sm">{track.title}</div>
                <div className="text-gray-500 text-xs">{track.album} • {track.year}</div>
              </div>
              <div className="text-gray-600 text-sm">
                {track.duration !== "00:00" ? track.duration : "Loading..."}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6 pt-4 border-t border-gray-100">
        <p className="text-gray-500 text-sm">
          Experience the divine voice of the Shahenshah-e-Qawwali
        </p>
      </div>
    </div>
  );
}
