import { Hono } from 'hono'
import type { Env } from '../index'
import { authMiddleware, createToken, setAuthCookie } from '../middleware/auth'
import { notifyDiscord } from '../lib/discord'

const api = new Hono<Env>()

// Submit opinion
api.post('/opinions', async (c) => {
  const formData = await c.req.parseBody()
  const body = typeof formData['body'] === 'string' ? formData['body'].trim() : ''

  if (!body || body.length > 2000) {
    return c.redirect('/?error=invalid')
  }

  await c.env.DB.prepare('INSERT INTO opinions (body) VALUES (?)').bind(body).run()
  await notifyDiscord(c.env.DISCORD_WEBHOOK_URL, body)

  return c.redirect('/?message=sent')
})

// Admin login
api.post('/admin/login', async (c) => {
  const formData = await c.req.parseBody()
  const password = typeof formData['password'] === 'string' ? formData['password'] : ''

  if (!password || password !== c.env.ADMIN_PASSWORD) {
    return c.redirect('/admin?error=invalid')
  }

  const token = await createToken(c.env.JWT_SECRET)
  setAuthCookie(c, token)
  return c.redirect('/admin')
})

// Get opinions (JSON)
api.get('/admin/opinions', authMiddleware, async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT id, body, created_at FROM opinions ORDER BY id DESC'
  ).all()
  return c.json(results)
})

// Delete opinion
api.post('/admin/opinions/:id/delete', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM opinions WHERE id = ?').bind(id).run()
  return c.redirect('/admin')
})

api.delete('/admin/opinions/:id', authMiddleware, async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM opinions WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

export default api
