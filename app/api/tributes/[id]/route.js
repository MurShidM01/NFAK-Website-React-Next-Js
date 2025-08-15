import { NextResponse } from 'next/server';
import { createClient } from 'redis';

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL_REDIS_URL
});

// Connect to Redis
redis.connect().catch(console.error);

// PUT - Update a tribute
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Get existing tributes
    const tributesData = await redis.get('tributes');
    const tributes = tributesData ? JSON.parse(tributesData) : [];
    
    // Find and update the tribute
    const tributeIndex = tributes.findIndex(t => t.id === id);
    if (tributeIndex === -1) {
      return NextResponse.json(
        { error: 'Tribute not found' },
        { status: 404 }
      );
    }
    
    // Update the tribute while preserving the ID and timestamp
    tributes[tributeIndex] = {
      ...tributes[tributeIndex],
      ...body,
      id: id, // Preserve original ID
      timestamp: tributes[tributeIndex].timestamp // Preserve original timestamp
    };
    
    // Store back to Redis
    await redis.set('tributes', JSON.stringify(tributes));
    
    return NextResponse.json({
      success: true,
      message: 'Tribute updated successfully',
      tribute: tributes[tributeIndex]
    });
  } catch (error) {
    console.error('Error updating tribute:', error);
    return NextResponse.json(
      { error: 'Failed to update tribute' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a tribute
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Get existing tributes
    const tributesData = await redis.get('tributes');
    const tributes = tributesData ? JSON.parse(tributesData) : [];
    
    // Filter out the tribute to delete
    const updatedTributes = tributes.filter(t => t.id !== id);
    
    if (updatedTributes.length === tributes.length) {
      return NextResponse.json(
        { error: 'Tribute not found' },
        { status: 404 }
      );
    }
    
    // Store back to Redis
    await redis.set('tributes', JSON.stringify(updatedTributes));
    
    return NextResponse.json({
      success: true,
      message: 'Tribute deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tribute:', error);
    return NextResponse.json(
      { error: 'Failed to delete tribute' },
      { status: 500 }
    );
  }
}
