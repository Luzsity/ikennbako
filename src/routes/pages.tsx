import { Hono } from 'hono'
import type { Env } from '../index'
import { isAuthenticated } from '../middleware/auth'
import Home from '../views/home'
import { LoginPage, AdminPage } from '../views/admin'

const pages = new Hono<Env>()

pages.get('/', (c) => {
  const message = c.req.query('message') === 'sent' ? '意見を送信しました。ありがとうございます！' : undefined
  const error = c.req.query('error') === 'invalid' ? '意見の内容が不正です。' : undefined
  return c.html(<Home message={message} error={error} />)
})

pages.get('/admin', async (c) => {
  const authenticated = await isAuthenticated(c)

  if (!authenticated) {
    const error = c.req.query('error') === 'invalid' ? 'パスワードが正しくありません。' :
      c.req.query('error') === 'unauthorized' ? 'ログインが必要です。' : undefined
    return c.html(<LoginPage error={error} />)
  }

  const { results } = await c.env.DB.prepare(
    'SELECT id, body, created_at FROM opinions ORDER BY id DESC'
  ).all<{ id: number; body: string; created_at: string }>()

  return c.html(<AdminPage opinions={results ?? []} />)
})

export default pages
