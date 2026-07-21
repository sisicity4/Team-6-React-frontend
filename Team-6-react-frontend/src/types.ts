export type Screen = 'home' | 'enemy' | 'reflection'

export type BottomNavItem = {
  key: Screen
  label: string
  note?: string
}

export type ReflectionEntry = {
  id: number
  action: string
  mood: number
  notes: string
  emotion_tags: string[]
  next_step: string
  success: boolean
  logged_at: string
}

export type ReflectionForm = {
  action: string
  mood: number
  notes: string
  emotion_tags: string[]
  next_step: string
  success: boolean
}

export type AuthProfile = {
  username: string
  last_login: string | null
  date_joined: string
  is_authenticated: boolean
  height_cm: number | null
  weight_kg: number | null
  goal_weight_kg: number | null
  training_style: string
  habit_frequency: string
  emotional_tone: string
  intentions: string
}

export type ReflectionMode = 'positive' | 'negative'
