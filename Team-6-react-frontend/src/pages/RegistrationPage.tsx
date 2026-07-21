import { FormEvent, useMemo, useState } from 'react'
import { Card } from '../components/ui/Card'

type Props = {
  onSubmit: (_payload: { username: string; password: string }) => Promise<void>
  isLoading: boolean
  errorMessage?: string
  onCancel: () => void
}

export function RegistrationPage({ onSubmit, isLoading, errorMessage, onCancel }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>(
    {},
  )

  const helperText = useMemo(() => {
    if (fieldErrors.username) return 'ユーザー名には英数字をご使用ください'
    return '半角英数字 1～30 文字以内、スペースなしで入力してください。'
  }, [fieldErrors.username])

  const validateFields = () => {
    const errors: { username?: string; password?: string } = {}
    if (!username.trim()) {
      errors.username = 'ユーザー名を入力してください'
    }
    if (!password) {
      errors.password = 'パスワードを入力してください'
    } else if (password.length < 8) {
      errors.password = 'パスワードは最低 8 文字必要です'
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateFields()) return
    await onSubmit({ username: username.trim(), password })
  }

  return (
    <div className="screen login-screen">
      <Card>
        <p className="page-title">新規登録</p>
        <p className="login-help">
          アカウントを作るにはユーザー名とパスワードを入力してください。入力を保存してすぐログインできます。
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-form__field">
            ユーザー名
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="例: yourname123"
              aria-invalid={Boolean(fieldErrors.username)}
              aria-describedby="username-helper"
              required
            />
            <p id="username-helper" className="field-helper">
              {helperText}
            </p>
            {fieldErrors.username && (
              <p className="field-error" role="alert">
                {fieldErrors.username}
              </p>
            )}
          </label>
          <label className="login-form__field">
            パスワード
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="8文字以上で設定"
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby="password-helper"
              required
            />
            <p id="password-helper" className="field-helper">
              8文字以上のパスワード推奨。記号や英数字を混ぜると安心です。
            </p>
            {fieldErrors.password && (
              <p className="field-error" role="alert">
                {fieldErrors.password}
              </p>
            )}
          </label>
          {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? '処理中…' : '登録する'}
          </button>
          <button
            type="button"
            className="link-button tiny"
            onClick={onCancel}
          >
            ログイン画面に戻る
          </button>
        </form>
      </Card>
    </div>
  )
}
