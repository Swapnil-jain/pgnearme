import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Validation schemas
const emailSchema = z.string().email()
const surveyResponseSchema = z.object({
  age: z.string(),
  findMethod: z.string(),
  frustration: z.string(),
  payForSchedule: z.string(),
  feedback: z.string().max(500)
})

// Simple in-memory rate limiting (server-side)
const ipRateLimits = new Map<string, {count: number, timestamp: number}>();
const emailRateLimits = new Map<string, {count: number, timestamp: number}>();

// Check IP rate limit (3 per day)
function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = ipRateLimits.get(ip);
  
  if (!limit) {
    ipRateLimits.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  // Reset if 24 hours have passed
  if (now - limit.timestamp > 24 * 60 * 60 * 1000) {
    ipRateLimits.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  // Block if over 3 requests per day from same IP
  if (limit.count >= 3) {
    return false;
  }
  
  // Increment counter
  ipRateLimits.set(ip, { count: limit.count + 1, timestamp: limit.timestamp });
  return true;
}

// Check email rate limit (5 per hour)
function checkEmailRateLimit(email: string): boolean {
  const now = Date.now();
  const limit = emailRateLimits.get(email);
  
  if (!limit) {
    emailRateLimits.set(email, { count: 1, timestamp: now });
    return true;
  }
  
  // Reset if 1 hour has passed
  if (now - limit.timestamp > 60 * 60 * 1000) {
    emailRateLimits.set(email, { count: 1, timestamp: now });
    return true;
  }
  
  // Block if over 5 requests per hour for same email
  if (limit.count >= 5) {
    return false;
  }
  
  // Increment counter
  emailRateLimits.set(email, { count: limit.count + 1, timestamp: limit.timestamp });
  return true;
}

export async function saveEmail(email: string, ip: string = 'unknown') {
  try {
    // Check rate limits
    if (!checkIpRateLimit(ip)) {
      return { success: false, message: 'Too many attempts from your location. Please try again later.' };
    }
    
    if (!checkEmailRateLimit(email)) {
      return { success: false, message: 'Too many attempts with this email. Please try again later.' };
    }
    
    // Validate email
    const validatedEmail = emailSchema.parse(email)
    
    const { data, error } = await supabase
      .from('emails')
      .insert([{ email: validatedEmail }])
      .select()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return { success: false, message: 'Email already exists' }
      }
      //console.error('Database error:', error)
      return { success: false, message: 'An error occurred' }
    }

    return { success: true, data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Invalid email format' }
    }
    //console.error('Error saving email:', error)
    return { success: false, message: 'An error occurred' }
  }
}

export async function updateSurveyStatus(email: string, surveyResponses: any, ip: string = 'unknown') {
  try {
    // Check rate limits
    if (!checkIpRateLimit(ip)) {
      return { success: false, message: 'Too many attempts from your location. Please try again later.' };
    }
    
    if (!checkEmailRateLimit(email)) {
      return { success: false, message: 'Too many attempts with this email. Please try again later.' };
    }
    
    // Validate email and survey responses
    const validatedEmail = emailSchema.parse(email)
    const validatedResponses = surveyResponseSchema.parse(surveyResponses)
    
    const { data, error } = await supabase
      .from('emails')
      .update({ 
        survey_completed: true,
        survey_responses: validatedResponses
      })
      .eq('email', validatedEmail)
      .select()

    if (error) {
      //console.error('Database error:', error)
      return { success: false, message: 'An error occurred' }
    }

    return { success: true, data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Invalid survey data' }
    }
    //console.error('Error updating survey status:', error)
    return { success: false, message: 'An error occurred' }
  }
}

// Function to get all emails
export async function getAllEmails() {
  try {
    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      //console.error('Database error:', error)
      return { success: false, message: 'An error occurred' }
    }

    return { success: true, data }
  } catch (error) {
    //console.error('Error fetching emails:', error)
    return { success: false, message: 'An error occurred' }
  }
} 