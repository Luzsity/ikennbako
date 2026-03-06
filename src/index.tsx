import { Hono } from 'hono'
import api from './routes/api'
import pages from './routes/pages'

export type Env = {
  Bindings: {
    DB: D1Database
    ADMIN_PASSWORD: string
    JWT_SECRET: string
    DISCORD_WEBHOOK_URL?: string
  }
}

const app = new Hono<Env>()

app.route('/api', api)
app.route('/', pages)

export default app
