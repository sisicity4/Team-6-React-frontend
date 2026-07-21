import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ReflectionPage } from '../pages/ReflectionPage'

const baseProps = {
  reflections: [
    {
      id: 1,
      action: 'プレゼンがうまくいかなかった',
      mood: 45,
      notes: '緊張した',
      emotion_tags: ['不安'],
      next_step: '練習を増やす',
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
    emotional_tone: '安心したい',
    intentions: '深呼吸をする',
  },
  onLogout: vi.fn(),
}

describe('ReflectionPage', () => {
  it('renders reflection sections', () => {
    render(<ReflectionPage {...baseProps} />)
    expect(screen.getByText('今週の振り返り')).toBeInTheDocument()
    expect(screen.getByText('過去ログ')).toBeInTheDocument()
    expect(screen.getByText('あなたの意図')).toBeInTheDocument()
  })
})
