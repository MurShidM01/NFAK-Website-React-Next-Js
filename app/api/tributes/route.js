import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const tributesFile = path.join(process.cwd(), 'data', 'tributes.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(tributesFile);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read tributes from JSON file
async function readTributes() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(tributesFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

// Write tributes to JSON file
async function writeTributes(tributes) {
  await ensureDataDir();
  await fs.writeFile(tributesFile, JSON.stringify(tributes, null, 2));
}

// GET - Retrieve all tributes
export async function GET() {
  try {
    const tributes = await readTributes();
    return NextResponse.json({ tributes });
  } catch (error) {
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

    // Read existing tributes
    const tributes = await readTributes();
    
    // Add new tribute
    tributes.unshift(newTribute); // Add to beginning of array
    
    // Write back to file
    await writeTributes(tributes);

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
