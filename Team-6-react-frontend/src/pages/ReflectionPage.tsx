import { useMemo, useState } from 'react'
import { Card } from '../components/ui/Card'
import { emotionIconMap } from '../data/appData'
import type { AuthProfile, ReflectionEntry } from '../types'

const formatLocalKey = (date: Date) => date.toLocaleDateString('sv-SE')

type Props = {
  reflections: ReflectionEntry[]
  isDemo?: boolean
  profile: AuthProfile | null
  onLogout: () => void
}

export function ReflectionPage({
  reflections,
  isDemo = false,
  profile,
  onLogout,
}: Props) {
  const latest = reflections[0]
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const weekDays = useMemo(() => {
    const today = new Date()
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today)
      date.setDate(today.getDate() - (6 - index))
      const key = formatLocalKey(date)
      return {
        key,
        label: `${date.getMonth() + 1}/${date.getDate()}`,
      }
    })
  }, [])

  const reflectionsByDate = useMemo(() => {
    const map = new Map<string, ReflectionEntry>()
    reflections.forEach((entry) => {
      const key = formatLocalKey(new Date(entry.logged_at))
      if (!map.has(key)) {
        map.set(key, entry)
      }
    })
    return map
  }, [reflections])

  const selectedReflection = useMemo(() => {
    if (!selectedDate) return null
    return reflectionsByDate.get(selectedDate) ?? null
  }, [selectedDate, reflectionsByDate])

  return (
    <section className="screen reflection-screen">
      <Card className="panel-card reflection-hero">
        <p className="page-title">振り返り</p>
        <p className="page-subtitle">
          今日の失敗を小さく言葉にして、次へつなげよう。
        </p>
        {isDemo && (
          <p className="demo-badge">デモ表示中：1週間分のサンプルです</p>
        )}
        <div className="reflection-hero__summary">
          <div>
            <p className="summary-label">今日の失敗（敵）</p>
            <p className="summary-value">{latest?.action ?? 'まだ記録がありません'}</p>
          </div>
          <div>
            <p className="summary-label">今の感情</p>
            <p className="summary-value">
              {profile?.emotional_tone || 'ことばにしてみよう'}
            </p>
          </div>
        </div>
      </Card>

      <Card className="panel-card reflection-calendar">
        <div className="timeline-header">
          <p className="section-title">今週の振り返り</p>
          <button type="button" className="link-button tiny">
            先週の振り返り
          </button>
        </div>
        <div className="calendar-row">
          {weekDays.map((day) => {
            const entry = reflectionsByDate.get(day.key)
            const icon = entry?.emotion_tags?.[0]
              ? emotionIconMap[entry.emotion_tags[0]] ?? '🙂'
              : '・'
            return (
              <button
                key={day.key}
                type="button"
                className={`calendar-cell ${day.key === selectedDate ? 'calendar-cell--active' : ''}`.trim()}
                onClick={() => setSelectedDate(day.key)}
              >
                <span className="calendar-icon">{icon}</span>
                <span className="calendar-label">{day.label}</span>
              </button>
            )
          })}
        </div>
        <div className="calendar-detail">
          {selectedReflection ? (
            <>
              <p className="summary-text">{selectedReflection.action}</p>
              <p className="summary-subtext">{selectedReflection.notes}</p>
            </>
          ) : (
            <p className="summary-subtext">日付をタップすると理由が表示されます。</p>
          )}
        </div>
      </Card>

      <Card className="panel-card reflection-timeline">
        <div className="timeline-header">
          <p className="section-title">過去ログ</p>
        </div>
        <div className="timeline-list">
          {reflections.length === 0 ? (
            <p>まだ記録がありません</p>
          ) : (
            reflections.map((entry) => (
              <div key={entry.id} className="timeline-card">
                <p className="timeline-date">
                  {new Date(entry.logged_at).toLocaleDateString()}
                </p>
                <p className="timeline-title">{entry.action}</p>
                <p className="timeline-notes">{entry.notes}</p>
                {entry.next_step && (
                  <p className="timeline-next">次の目標: {entry.next_step}</p>
                )}
                <div className="timeline-tags">
                  {entry.emotion_tags?.map((tag) => (
                    <span key={tag} className="tag-chip tag-chip--small">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card className="panel-card reflection-profile">
        <p className="section-title">あなたの意図</p>
        <p className="summary-text">{profile?.intentions || '意図を登録しておくと支えになります。'}</p>
        <button type="button" className="secondary-button" onClick={onLogout}>
          ログアウト
        </button>
      </Card>
    </section>
  )
}
