import type { FC } from 'hono/jsx'
import Layout from './layout'

type Opinion = {
  id: number
  body: string
  created_at: string
}

export const LoginPage: FC<{ error?: string }> = ({ error }) => (
  <Layout title="管理者ログイン - 意見箱">
    <h1>管理者ログイン</h1>
    {error && <div class="message error">{error}</div>}
    <div class="card">
      <form method="post" action="/api/admin/login">
        <label for="password">パスワード</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          style="margin-top: 0.5rem"
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  </Layout>
)

export const AdminPage: FC<{ opinions: Opinion[] }> = ({ opinions }) => (
  <Layout title="管理画面 - 意見箱">
    <h1>管理画面</h1>
    <p style="text-align: center; margin-bottom: 1rem; color: #888;">
      {opinions.length} 件の意見
    </p>
    <div class="card">
      {opinions.length === 0 ? (
        <div class="empty">まだ意見はありません</div>
      ) : (
        opinions.map((op) => (
          <div class="opinion-item" key={op.id}>
            <p style="white-space: pre-wrap">{op.body}</p>
            <div class="opinion-meta">
              <span>{op.created_at}</span>
              <form method="post" action={`/api/admin/opinions/${op.id}/delete`} style="margin: 0">
                <button class="danger" type="submit" style="width: auto; margin: 0; padding: 0.3rem 0.75rem; font-size: 0.85rem;">
                  削除
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
    <a href="/" style="display: block; text-align: center; margin-top: 1rem; color: #4a90d9;">
      トップページへ
    </a>
  </Layout>
)
