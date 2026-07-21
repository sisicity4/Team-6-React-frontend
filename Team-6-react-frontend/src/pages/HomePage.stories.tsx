import type { Meta, StoryObj } from '@storybook/react'
import { HomePage } from './HomePage'

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
}

export default meta

type Story = StoryObj<typeof HomePage>

export const Default: Story = {
  args: {
    latestReflection: {
      id: 1,
      action: 'メール返信が遅れた',
      mood: 40,
      notes: '焦ったけど少し落ち着いた',
      emotion_tags: ['不安'],
      next_step: '早めに相談する',
      success: false,
      logged_at: '2026-02-04T10:00:00Z',
    },
    profile: {
      username: 'tester',
      last_login: null,
      date_joined: '2026-02-01T00:00:00Z',
      is_authenticated: true,
      height_cm: null,
      weight_kg: null,
      goal_weight_kg: null,
      training_style: '',
      habit_frequency: '',
      emotional_tone: '落ち着きたい',
      intentions: '次は深呼吸する',
    },
    onStartReflection: () => null,
    showReflectionForm: true,
    reflectionForm: {
      action: '',
      notes: '',
      next_step: '',
      success: false,
      emotion_tags: [],
    },
    submitMessage: null,
    onReflectionChange: () => null,
    onSubmitReflection: () => null,
    reflectionMode: 'positive',
    sparkleTrigger: 0,
  },
}
