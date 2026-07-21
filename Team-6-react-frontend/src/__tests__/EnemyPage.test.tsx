import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EnemyPage } from '../pages/EnemyPage'

describe('EnemyPage', () => {
  it('renders placeholder enemy', () => {
    render(<EnemyPage latestReflection={null} />)
    expect(screen.getByText('敵を倒す')).toBeInTheDocument()
    expect(screen.getByText('仮の敵キャラ')).toBeInTheDocument()
  })
})
