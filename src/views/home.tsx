import type { FC } from 'hono/jsx'
import Layout from './layout'

const Home: FC<{ message?: string; error?: string }> = ({ message, error }) => (
  <Layout title="意見箱">
    <h1>意見箱</h1>
    {message && <div class="message success">{message}</div>}
    {error && <div class="message error">{error}</div>}
    <div class="card">
      <form method="post" action="/api/opinions">
        <label for="body">あなたの意見を聞かせてください</label>
        <textarea
          id="body"
          name="body"
          rows={5}
          placeholder="ここに意見を入力..."
          required
          minLength={1}
          maxLength={2000}
          style="margin-top: 0.5rem"
        />
        <button type="submit">匿名で送信</button>
      </form>
    </div>
    <p style="text-align: center; font-size: 0.85rem; color: #888; margin-top: 1rem;">
      投稿は完全に匿名です
    </p>
  </Layout>
)

export default Home
