import type { ReflectionEntry } from '../types'

type DemoSeed = {
  action: string
  notes: string
  success: boolean
  emotion_tags: string[]
  next_step: string
}

const demoSeeds: DemoSeed[] = [
  {
    action: '時間を守れた',
    notes: '朝の準備を早めにしたら落ち着いて動けた。',
    success: true,
    emotion_tags: ['少し前向き'],
    next_step: '明日も10分早く起きる',
  },
  {
    action: '時間が足りなかった',
    notes: '予定を詰めすぎて余裕がなくなった。',
    success: false,
    emotion_tags: ['焦り'],
    next_step: '明日は予定を1つ減らす',
  },
  {
    action: '仲間と連携できた',
    notes: '相談できて安心した。',
    success: true,
    emotion_tags: ['安堵'],
    next_step: '助け合いを意識して声をかける',
  },
  {
    action: '疲れていた',
    notes: '体力が足りず集中できなかった。',
    success: false,
    emotion_tags: ['疲れた'],
    next_step: '今日は早めに休む',
  },
  {
    action: '集中できた',
    notes: '短い時間でも集中できたのが嬉しい。',
    success: true,
    emotion_tags: ['少し前向き'],
    next_step: '集中できた時間をメモする',
  },
  {
    action: '気持ちが乗らなかった',
    notes: '気分が沈んで動き出せなかった。',
    success: false,
    emotion_tags: ['不安'],
    next_step: '最初の5分だけやってみる',
  },
  {
    action: '少し前向きになれた',
    notes: '一言書けただけでも前進だと思えた。',
    success: true,
    emotion_tags: ['安堵'],
    next_step: '明日も小さく続ける',
  },
]

const buildIso = (date: Date) => {
  const copy = new Date(date)
  copy.setHours(9, 0, 0, 0)
  return copy.toISOString()
}

export const demoReflections: ReflectionEntry[] = (() => {
  const today = new Date()
  const entries: ReflectionEntry[] = []
  for (let i = 0; i < 7; i += 1) {
    const seed = demoSeeds[i % demoSeeds.length]
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    entries.push({
      id: 1000 + i,
      action: seed.action,
      mood: seed.success ? 65 : 40,
      notes: seed.notes,
      emotion_tags: seed.emotion_tags,
      next_step: seed.next_step,
      success: seed.success,
      logged_at: buildIso(date),
    })
  }
  return entries
})()
