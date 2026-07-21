import { Card } from '../components/ui/Card'
import type { ReflectionEntry } from '../types'

const PLACEHOLDER_ENEMY = {
  name: '仮の敵キャラ',
  description: 'ここに敵キャラ画像を差し替えてください。',
}

type Props = {
  latestReflection: ReflectionEntry | null
}

export function EnemyPage({ latestReflection }: Props) {
  return (
    <section className="screen enemy-screen">
      <Card className="panel-card enemy-card">
        <div className="enemy-hero">
          <div className="enemy-avatar" aria-label="仮の敵キャラ">
            <span>?</span>
          </div>
          <div>
            <p className="page-title">敵を倒す</p>
            <p className="page-subtitle">
              今日の敵を見つめて、次の一歩を選ぼう。
            </p>
          </div>
        </div>
        <div className="enemy-summary">
          <p className="summary-label">今日の敵</p>
          <p className="summary-value">{PLACEHOLDER_ENEMY.name}</p>
          <p className="summary-subtext">{PLACEHOLDER_ENEMY.description}</p>
        </div>
        <div className="enemy-latest">
          <p className="section-title">直近の失敗メモ</p>
          <p className="summary-text">
            {latestReflection?.action || 'まだ記録がありません'}
          </p>
          {latestReflection?.notes && (
            <p className="summary-subtext">{latestReflection.notes}</p>
          )}
        </div>
        <button type="button" className="primary-button">
          この敵に向き合う
        </button>
      </Card>
    </section>
  )
}
