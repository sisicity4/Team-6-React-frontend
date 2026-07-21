import { FormEvent, useMemo, useState } from 'react'
import { Card } from '../components/ui/Card'

type Props = {
  onLogin: (_payload: { username: string; password: string }) => Promise<void>
  isLoading: boolean
  errorMessage?: string
  onRequestRegister?: () => void
  onRequestForgotPassword?: () => void
}

type FieldErrors = {
  username?: string
  password?: string
}

const INITIAL_ERRORS: FieldErrors = {}

export function LoginPage({
  onLogin,
  isLoading,
  errorMessage,
  onRequestRegister,
  onRequestForgotPassword,
}: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>(INITIAL_ERRORS)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const helperText = useMemo(() => {
    if (fieldErrors.username) return 'ユーザー名には英数字をご使用ください'
    return '半角英数字 1～30 文字以内、スペースなしで入力してください。'
  }, [fieldErrors.username])

  const validateFields = () => {
    const errors: FieldErrors = {}
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
    await onLogin({ username: username.trim(), password })
  }

  return (
    <div className="screen login-screen">
      <Card>
        <p className="page-title">ログイン</p>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="login-form__field">
            ユーザー名
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
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
            <div className="password-input">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby="password-helper"
                required
              />
              <button
                type="button"
                className="link-button tiny"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? '非表示' : '表示'}
              </button>
            </div>
            <p id="password-helper" className="field-helper">
              8文字以上のパスワード推奨。記号や英数字を混ぜると安心です。
            </p>
            {fieldErrors.password && (
              <p className="field-error" role="alert">
                {fieldErrors.password}
              </p>
            )}
          </label>
          {errorMessage && (
            <p className="form-error" role="alert">
              {errorMessage}
            </p>
          )}
          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? 'ログイン中…' : 'ログイン'}
          </button>
          <div className="login-form__actions">
            <button
              type="button"
              className="link-button tiny"
              onClick={() => onRequestForgotPassword?.()}
            >
              パスワードを忘れたら
            </button>
            <button
              type="button"
              className="link-button tiny"
              onClick={() => onRequestRegister?.()}
            >
              新規登録はこちら
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
