import { NextRequest, NextResponse } from 'next/server';
import { saveEmail } from '@/lib/email-service';

// API route for email submission
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown';
    
    // Basic validation
    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Call the rate-limited function
    const result = await saveEmail(body.email, ip);
    
    if (!result.success) {
      const errorMessage = result.message || 'An error occurred';
      const status = errorMessage.includes('Too many attempts') ? 429 : 400;
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status }
      );
    }
    
    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'An error occurred' },
      { status: 500 }
    );
  }
} 