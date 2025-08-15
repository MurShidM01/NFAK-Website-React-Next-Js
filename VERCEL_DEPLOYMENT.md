# Vercel Deployment Guide for Audio Files

## Issue: Audio Files Not Playing on Vercel

If your audio files are not playing after deploying to Vercel, follow these steps:

## 1. Check File Structure

Ensure your audio files are in the correct location:
```
public/
  songs/
    song1.m4a
    song2.m4a
    ...
```

## 2. Verify File Upload

Make sure all audio files were uploaded to Vercel:
- Check your Vercel dashboard
- Verify file sizes match your local files
- Ensure no files were excluded by `.gitignore`

## 3. Test Audio File Access

Visit `/audio-test` on your deployed site to:
- Check if audio files are accessible
- Test HTTP responses
- Verify file paths

## 4. Common Issues & Solutions

### Issue: 404 Errors for Audio Files
**Solution**: Ensure files are in `public/songs/` directory

### Issue: CORS Errors
**Solution**: Added CORS headers in `next.config.mjs`

### Issue: Audio Loading Timeout
**Solution**: Added better error handling and retry mechanisms

### Issue: File Size Limits
**Solution**: Vercel has a 50MB limit for individual files

## 5. Debugging Steps

1. **Check Browser Console** for errors
2. **Visit `/audio-test`** to test file accessibility
3. **Try direct file URLs** (e.g., `yoursite.vercel.app/songs/song.m4a`)
4. **Check Network tab** in browser dev tools

## 6. Alternative Solutions

If issues persist:

### Option 1: Use External Hosting
- Upload audio files to a CDN (AWS S3, Cloudinary)
- Update file paths in `MusicPlayer.js`

### Option 2: Convert File Formats
- Convert `.m4a` to `.mp3` (better browser support)
- Use smaller file sizes

### Option 3: Streaming Service
- Use a music streaming service API
- Implement audio streaming instead of file hosting

## 7. Testing Locally

Before deploying:
```bash
npm run build
npm run start
```

Test audio playback in production build locally.

## 8. Vercel-Specific Settings

Your `next.config.mjs` includes:
- CORS headers for audio files
- Webpack configuration for audio assets
- Proper file handling

## 9. Contact Support

If issues persist:
1. Check Vercel deployment logs
2. Verify file permissions
3. Test with different browsers
4. Check mobile vs desktop behavior

## 10. Quick Fix Commands

```bash
# Rebuild and redeploy
git add .
git commit -m "Fix audio playback issues"
git push

# Or force redeploy on Vercel
vercel --prod
```

---

**Note**: Audio playback issues on Vercel are often related to file serving or CORS. The updated code includes comprehensive error handling and debugging tools to identify and resolve these issues.
