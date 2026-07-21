import type { Meta, StoryObj } from '@storybook/react'
import { ReflectionPage } from './ReflectionPage'

const meta: Meta<typeof ReflectionPage> = {
  title: 'Pages/ReflectionPage',
  component: ReflectionPage,
}

export default meta

type Story = StoryObj<typeof ReflectionPage>

export const Default: Story = {
  args: {
    reflections: [
      {
        id: 1,
        action: '会議が長引いた',
        mood: 45,
        notes: '焦ったけど助けてもらえた',
        emotion_tags: ['不安', '安堵'],
        next_step: '早めに相談する',
        success: false,
        logged_at: '2026-02-04T10:00:00Z',
      },
    ],
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
    onLogout: () => null,
  },
}
