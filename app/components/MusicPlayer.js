'use client';

import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = `/songs/${tracks[currentTrack].filename}`;
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
        // Update track duration in the tracks array
        const minutes = Math.floor(audioRef.current.duration / 60);
        const seconds = Math.floor(audioRef.current.duration % 60);
        tracks[currentTrack].duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      });

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        nextTrack();
      });
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = percent * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleTrackChange = (index) => {
    setCurrentTrack(index);
    setIsPlaying(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">🎵</div>
        <h4 className="text-xl font-medium text-gray-800 mb-2">Musical Legacy</h4>
        <p className="text-gray-600 text-sm">Timeless qawwalis by Ustad Nusrat Fateh Ali Khan</p>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" />

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
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div 
          className="w-full bg-gray-200 rounded-full h-2 cursor-pointer"
          onClick={handleSeek}
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
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          ⏮️
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
        >
          <span className="text-white text-2xl">
            {isPlaying ? '⏸️' : '▶️'}
          </span>
        </button>
        
        <button 
          onClick={nextTrack}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          ⏭️
        </button>
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
