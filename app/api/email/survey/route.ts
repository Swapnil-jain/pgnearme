import { NextRequest, NextResponse } from 'next/server';
import { updateSurveyStatus } from '@/lib/email-service';
import { z } from 'zod';

// Define validation schema
const surveySchema = z.object({
  email: z.string().email(),
  surveyData: z.object({
    age: z.string(),
    findMethod: z.string(),
    frustration: z.string(),
    payForSchedule: z.string(),
    feedback: z.string().max(500)
  })
});

// API route for survey submission
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown';
    
    // Basic validation
    if (!body.email || !body.surveyData) {
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    // Full validation
    let validatedData;
    try {
      validatedData = surveySchema.parse(body);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid survey data' },
        { status: 400 }
      );
    }
    
    // Call the rate-limited function
    const result = await updateSurveyStatus(
      validatedData.email,
      validatedData.surveyData,
      ip
    );
    
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
    //console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred' },
      { status: 500 }
    );
  }
} 