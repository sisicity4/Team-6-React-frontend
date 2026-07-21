import { useEffect, useState } from 'react'

type Props = {
  onDurationChange?: (_seconds: number) => void
}

export function WorkoutTimer({ onDurationChange }: Props) {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const interval = window.setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
    return () => window.clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    onDurationChange?.(seconds)
  }, [seconds, onDurationChange])

  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60

  return (
    <div className="timer-card">
      <p className="section-title">タイマー</p>
      <div className="timer-display">
        {minutes}:{remainder.toString().padStart(2, '0')}
      </div>
      <div className="unified-actions">
        <button
          type="button"
          className="primary-button"
          onClick={() => setIsRunning((prev) => !prev)}
        >
          {isRunning ? '一時停止' : 'スタート'}
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            setSeconds(0)
            setIsRunning(false)
          }}
        >
          リセット
        </button>
      </div>
    </div>
  )
}
