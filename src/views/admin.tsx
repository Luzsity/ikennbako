import type { FC } from 'hono/jsx'
import Layout from './layout'

type Opinion = {
  id: number
  body: string
  created_at: string
}

export const LoginPage: FC<{ error?: string }> = ({ error }) => (
  <Layout title="管理者ログイン - 意見箱">
    <div class="page-wrapper">
      <div class="container--narrow container--login">
        <div class="page-header">
          <span class="page-header__icon" role="img" aria-label="lock">🔒</span>
          <h1 class="page-header__title">管理者ログイン</h1>
        </div>
        {error && (
          <div class="message message--error">
            <span class="message__icon">!</span>
            {error}
          </div>
        )}
        <div class="card card--elevated">
          <form method="post" action="/api/admin/login">
            <label for="password">パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              required
            />
            <button class="btn btn--primary" type="submit">ログイン</button>
          </form>
        </div>
        <a href="/" class="back-link">← トップページへ</a>
      </div>
    </div>
  </Layout>
)

export const AdminPage: FC<{ opinions: Opinion[] }> = ({ opinions }) => (
  <Layout title="管理画面 - 意見箱">
    <div class="container--wide">
      <div class="admin-header">
        <h1 class="admin-header__title">管理画面</h1>
        <span class="stats-badge">{opinions.length} 件</span>
      </div>
      {opinions.length === 0 ? (
        <div class="empty-state">
          <span class="empty-state__icon" role="img" aria-label="empty mailbox">📭</span>
          <p class="empty-state__text">まだ意見はありません</p>
        </div>
      ) : (
        <div class="opinion-list">
          {opinions.map((op) => (
            <div class="opinion-card" key={op.id}>
              <p class="opinion-card__body">{op.body}</p>
              <div class="opinion-card__meta">
                <span>{op.created_at}</span>
                <form method="post" action={`/api/admin/opinions/${op.id}/delete`} style="margin: 0">
                  <button class="btn btn--danger" type="submit">削除</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
      <a href="/" class="back-link">← トップページへ</a>
    </div>
  </Layout>
)
