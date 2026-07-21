import type { BottomNavItem } from '../types'

export const bottomNavItems: BottomNavItem[] = [
  { key: 'home', label: 'ホーム' },
  { key: 'enemy', label: '敵を倒す' },
  { key: 'reflection', label: '振り返り' },
]

export const emotionTagOptions = [
  '安堵',
  '不安',
  '悔しい',
  '焦り',
  '少し前向き',
  '疲れた',
]

export const emotionIconMap: Record<string, string> = {
  安堵: '🙂',
  不安: '😟',
  悔しい: '😣',
  焦り: '😮‍💨',
  少し前向き: '🌱',
  疲れた: '😴',
}
