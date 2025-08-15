import { NextResponse } from 'next/server';
import { createClient } from 'redis';

// Create Redis client with the duplicated environment variable
const redis = createClient({
  url: process.env.REDIS_URL_REDIS_URL
});

// Connect to Redis
redis.connect().catch(console.error);

// GET - Retrieve all tributes
export async function GET() {
  try {
    const tributesData = await redis.get('tributes');
    const tributes = tributesData ? JSON.parse(tributesData) : [];
    return NextResponse.json({ tributes });
  } catch (error) {
    console.error('Error fetching tributes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tributes' },
      { status: 500 }
    );
  }
}

// POST - Submit a new tribute
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, country, message, tribute, category } = body;

    // Validate required fields
    if (!name || !message || !country) {
      return NextResponse.json(
        { error: 'Name, message, and country are required' },
        { status: 400 }
      );
    }

    // Create new tribute object
    const newTribute = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email ? email.trim() : '',
      country: country.trim(),
      message: message.trim(),
      tribute: tribute ? tribute.trim() : '',
      category: category || 'general',
      timestamp: new Date().toISOString(),
      approved: true // Auto-approve for now, can be changed to false for moderation
    };

    // Get existing tributes from Redis
    const tributesData = await redis.get('tributes');
    const tributes = tributesData ? JSON.parse(tributesData) : [];
    
    // Add new tribute to beginning of array
    tributes.unshift(newTribute);
    
    // Store back to Redis
    await redis.set('tributes', JSON.stringify(tributes));

    return NextResponse.json({
      success: true,
      message: 'Tribute submitted successfully',
      tribute: newTribute
    });
  } catch (error) {
    console.error('Error submitting tribute:', error);
    return NextResponse.json(
      { error: 'Failed to submit tribute' },
      { status: 500 }
    );
  }
}
