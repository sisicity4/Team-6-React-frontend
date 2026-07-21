import type { CSSProperties } from 'react'

type Props = {
  value: number
  label?: string
  color?: string
}

export function ProgressBar({ value, label, color = '#A880FF' }: Props) {
  const pct = Math.max(0, Math.min(100, value))
  const fillStyle: CSSProperties = { width: `${pct}%`, background: color }

  return (
    <div className="progress-bar">
      {label && <p className="progress-bar__label">{label}</p>}
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={fillStyle} />
      </div>
    </div>
  )
}
