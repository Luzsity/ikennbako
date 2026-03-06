import type { FC } from 'hono/jsx'
import Layout from './layout'

const Home: FC<{ message?: string; error?: string }> = ({ message, error }) => (
  <Layout title="意見箱">
    <div class="page-wrapper">
      <div class="container--narrow">
        <div class="page-header">
          <span class="page-header__icon" role="img" aria-label="mailbox">📮</span>
          <h1 class="page-header__title">意見箱</h1>
          <p class="page-header__subtitle">あなたの声を届けてください</p>
        </div>
        {message && (
          <div class="message message--success">
            <span class="message__icon">✓</span>
            {message}
          </div>
        )}
        {error && (
          <div class="message message--error">
            <span class="message__icon">!</span>
            {error}
          </div>
        )}
        <div class="card card--elevated">
          <form method="post" action="/api/opinions">
            <label for="body">あなたの意見を聞かせてください</label>
            <textarea
              id="body"
              name="body"
              rows={6}
              placeholder="ここに意見を入力..."
              required
              minLength={1}
              maxLength={2000}
            />
            <p class="input-hint">最大 2,000 文字</p>
            <button class="btn btn--primary" type="submit">匿名で送信</button>
          </form>
        </div>
        <div class="anon-badge">
          <span class="anon-badge__dot" />
          投稿は完全に匿名です
        </div>
      </div>
    </div>
  </Layout>
)

export default Home
