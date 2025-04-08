import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function saveEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from('emails')
      .insert([{ email }])
      .select()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return { success: false, message: 'Email already exists' }
      }
      throw error
    }

    return { success: true, data }
  } catch (error) {
    //console.error('Error saving email:', error)
    return { success: false, error }
  }
}

export async function updateSurveyStatus(email: string, surveyResponses: any) {
  try {
    const { data, error } = await supabase
      .from('emails')
      .update({ 
        survey_completed: true,
        survey_responses: surveyResponses
      })
      .eq('email', email)
      .select()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    //console.error('Error updating survey status:', error)
    return { success: false, error }
  }
}

// Function to get all emails
export async function getAllEmails() {
  try {
    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    //console.error('Error fetching emails:', error)
    return { success: false, error }
  }
} 