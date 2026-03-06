import { createMiddleware } from 'hono/factory'
import { verify, sign } from 'hono/jwt'
import { getCookie, setCookie } from 'hono/cookie'
import type { Env } from '../index'

const COOKIE_NAME = 'admin_token'

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
  const token = getCookie(c, COOKIE_NAME)
  if (!token) {
    return c.redirect('/admin?error=unauthorized')
  }
  try {
    await verify(token, c.env.JWT_SECRET, 'HS256')
  } catch {
    return c.redirect('/admin?error=unauthorized')
  }
  await next()
})

export async function createToken(secret: string): Promise<string> {
  return await sign({ role: 'admin', exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, secret, 'HS256')
}

export function setAuthCookie(c: any, token: string) {
  setCookie(c, COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}

export async function isAuthenticated(c: any): Promise<boolean> {
  const token = getCookie(c, COOKIE_NAME)
  if (!token) return false
  try {
    await verify(token, c.env.JWT_SECRET, 'HS256')
    return true
  } catch {
    return false
  }
}
