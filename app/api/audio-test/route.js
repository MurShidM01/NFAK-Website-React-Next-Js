import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const songsDir = path.join(process.cwd(), 'public', 'songs');
    
    // Check if songs directory exists
    if (!fs.existsSync(songsDir)) {
      return NextResponse.json({ 
        error: 'Songs directory not found',
        path: songsDir 
      }, { status: 404 });
    }

    // List all audio files
    const files = fs.readdirSync(songsDir);
    const audioFiles = files.filter(file => 
      file.match(/\.(m4a|mp3|wav|ogg)$/i)
    );

    // Check file sizes
    const fileInfo = audioFiles.map(file => {
      const filePath = path.join(songsDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
        path: `/songs/${file}`
      };
    });

    return NextResponse.json({
      success: true,
      songsDirectory: songsDir,
      totalFiles: audioFiles.length,
      files: fileInfo
    });

  } catch (error) {
    console.error('Audio test error:', error);
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}
