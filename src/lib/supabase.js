import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const dbHelpers = {
  // User profile operations
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ user_id: userId, ...updates })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Session operations
  async saveSession(userId, sessionData) {
    const { data, error } = await supabase
      .from('sessions')
      .upsert({
        user_id: userId,
        active_step: sessionData.activeStep,
        hero_data: sessionData.heroData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getSession(userId) {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Hero frequency operations
  async saveHeroFrequency(userId, frequencyData) {
    const { data, error } = await supabase
      .from('hero_frequencies')
      .upsert({
        user_id: userId,
        personality_sun: frequencyData.personalitySun,
        design_sun: frequencyData.designSun,
        evolution_gate: frequencyData.evolutionGate,
        purpose_gate: frequencyData.purposeGate,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getHeroFrequency(userId) {
    const { data, error } = await supabase
      .from('hero_frequencies')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Mantras operations
  async saveMantras(frequencyId, mantras) {
    const mantrasData = mantras.map(text => ({
      frequency_id: frequencyId,
      text
    }))

    const { data, error } = await supabase
      .from('mantras')
      .upsert(mantrasData)
      .select()
    
    if (error) throw error
    return data
  },

  async getMantras(frequencyId) {
    const { data, error } = await supabase
      .from('mantras')
      .select('*')
      .eq('frequency_id', frequencyId)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Story operations
  async saveStory(frequencyId, storyArc) {
    const { data, error } = await supabase
      .from('stories')
      .upsert({
        frequency_id: frequencyId,
        story_arc: storyArc,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getStory(frequencyId) {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('frequency_id', frequencyId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }
}