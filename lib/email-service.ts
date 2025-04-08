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
  frustration: z.string().max(500),
  payForSchedule: z.string(),
  payForVerification: z.string().optional()
})

export async function saveEmail(email: string) {
  try {
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

export async function updateSurveyStatus(email: string, surveyResponses: any) {
  try {
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