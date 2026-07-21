import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { BottomNav } from './components/BottomNav'
import { bottomNavItems } from './data/appData'
import { demoReflections } from './data/demoReflections'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { ReflectionPage } from './pages/ReflectionPage'
import { EnemyPage } from './pages/EnemyPage'
import client, { createReflection, getProfile, getReflections } from './api/client'
import type {
  AuthProfile,
  ReflectionEntry,
  ReflectionForm,
  ReflectionMode,
  Screen,
} from './types'

const REFLECTION_FORM_DEFAULT: ReflectionForm = {
  action: '',
  mood: 50,
  notes: '',
  emotion_tags: [],
  next_step: '',
  success: false,
}

export function App() {
  const [screen, setScreen] = useState<Screen>('reflection')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [profile, setProfile] = useState<AuthProfile | null>(null)
  const [reflections, setReflections] = useState<ReflectionEntry[]>([])
  const [reflectionsError, setReflectionsError] = useState<string | null>(null)
  const [reflectionForm, setReflectionForm] = useState<ReflectionForm>(
    REFLECTION_FORM_DEFAULT,
  )
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [showReflectionForm, setShowReflectionForm] = useState(false)
  const [authView, setAuthView] = useState<'login' | 'register'>('login')
  const [reflectionMode, setReflectionMode] = useState<ReflectionMode | null>(null)
  const [sparkleTrigger, setSparkleTrigger] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const token = window.localStorage.getItem('petfit_access')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleLogoutEvent = () => {
      setAuthError('セッションが切れました。もう一度ログインしてください。')
      setIsAuthenticated(false)
      setProfile(null)
      setReflections([])
      setScreen('reflection')
    }
    window.addEventListener('auth:logout', handleLogoutEvent)
    return () => window.removeEventListener('auth:logout', handleLogoutEvent)
  }, [])

  const loadProfile = useCallback(async () => {
    try {
      const response = await getProfile()
      setProfile(response)
    } catch (error) {
      console.error('failed to load profile', error)
      setProfile(null)
    }
  }, [])

  const loadReflections = useCallback(async () => {
    try {
      const response = await getReflections()
      setReflections(response)
      setReflectionsError(null)
    } catch (error) {
      console.error('failed to load reflections', error)
      setReflections([])
      setReflectionsError('振り返りデータの取得に失敗しました。')
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return
    loadProfile()
    loadReflections()
  }, [isAuthenticated, loadProfile, loadReflections])

  const demoEnabled = import.meta.env.VITE_ENABLE_DEMO === 'true'
  const displayedReflections = useMemo(
    () =>
      reflections.length > 0
        ? reflections
        : demoEnabled && !reflectionsError
          ? demoReflections
          : [],
    [demoEnabled, reflections, reflectionsError],
  )
  const latestReflection = useMemo(
    () => displayedReflections[0] ?? null,
    [displayedReflections],
  )

  const handleReflectionChange = (data: Partial<ReflectionForm>) => {
    setReflectionForm((prev) => ({ ...prev, ...data }))
  }

  const handleReflectionSubmit = async () => {
    try {
      await createReflection(reflectionForm)
      setReflectionForm(REFLECTION_FORM_DEFAULT)
      setShowReflectionForm(false)
      setReflectionMode(null)
      if (reflectionMode === 'positive') {
        setSparkleTrigger((prev) => prev + 1)
      }
      setSubmitMessage('ありがとう。次の一歩を小さく積み重ねよう。')
      loadReflections()
    } catch (error) {
      console.error('failed to save reflection', error)
    }
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('petfit_access')
      window.localStorage.removeItem('petfit_refresh')
    }
    setIsAuthenticated(false)
    setProfile(null)
    setReflections([])
    setScreen('reflection')
  }

  const handleLogin = async (payload: { username: string; password: string }) => {
    setAuthError(null)
    setAuthLoading(true)
    try {
      const response = await client.post('login/', payload)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('petfit_access', response.data.access)
        window.localStorage.setItem('petfit_refresh', response.data.refresh)
      }
      setIsAuthenticated(true)
      await loadProfile()
      await loadReflections()
      setScreen('reflection')
    } catch (error) {
      console.error('login failed', error)
      const response = (error as { response?: { data?: { detail?: string } } })?.response
      setAuthError(
        response?.data?.detail ??
          'ログインに失敗しました。ユーザー名とパスワードを確認してください。',
      )
    } finally {
      setAuthLoading(false)
    }
  }

  const handleRegister = async (payload: { username: string; password: string }) => {
    setAuthError(null)
    setAuthLoading(true)
    try {
      await client.post('register/', payload)
      setAuthView('login')
      setAuthError('ユーザー登録が完了しました。ログインしてください。')
    } catch (error) {
      console.error('registration failed', error)
      const response = (error as { response?: { data?: { error?: string } } })?.response
      setAuthError(
        response?.data?.error ??
          '登録に失敗しました。すでにアカウントが存在する可能性があります。',
      )
    } finally {
      setAuthLoading(false)
    }
  }

  const handleRequestRegister = () => {
    setAuthView('register')
  }

  const handleRequestForgotPassword = () => {
    setAuthError('パスワード再発行は準備中です。ご自身でリマインダーをご確認ください。')
  }

  const openReflectionForm = (mode: ReflectionMode) => {
    setSubmitMessage(null)
    setReflectionMode(mode)
    setShowReflectionForm(true)
  }

  useEffect(() => {
    if (screen !== 'home') {
      setShowReflectionForm(false)
      setReflectionMode(null)
    }
  }, [screen])

  const renderScreen = () => {
    if (screen === 'home') {
      return (
        <HomePage
          latestReflection={latestReflection}
          profile={profile}
          showReflectionForm={showReflectionForm}
          reflectionForm={reflectionForm}
          submitMessage={submitMessage}
          sparkleTrigger={sparkleTrigger}
          onReflectionChange={handleReflectionChange}
          onSubmitReflection={handleReflectionSubmit}
          reflectionMode={reflectionMode}
          onStartReflection={openReflectionForm}
        />
      )
    }
    if (screen === 'enemy') {
      return <EnemyPage latestReflection={latestReflection} />
    }
    return (
      <ReflectionPage
        reflections={displayedReflections}
        isDemo={demoEnabled && !reflectionsError && displayedReflections === demoReflections}
        profile={profile}
        onLogout={handleLogout}
      />
    )
  }

  if (!isAuthenticated) {
    if (authView === 'register') {
      return (
        <RegistrationPage
          isLoading={authLoading}
          errorMessage={authError ?? undefined}
          onSubmit={handleRegister}
          onCancel={() => setAuthView('login')}
        />
      )
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        isLoading={authLoading}
        errorMessage={authError ?? undefined}
        onRequestRegister={handleRequestRegister}
        onRequestForgotPassword={handleRequestForgotPassword}
      />
    )
  }

  return (
    <div className="app-shell reflection-shell">
      {renderScreen()}
      <BottomNav items={bottomNavItems} activeKey={screen} onNavigate={setScreen} />
    </div>
  )
}
