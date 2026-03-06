export async function notifyDiscord(webhookUrl: string | undefined, body: string): Promise<void> {
  if (!webhookUrl) return

  const truncated = body.length > 1000 ? body.slice(0, 1000) + '...' : body

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '新しい意見が届きました',
          description: truncated,
          color: 0x4a90d9,
          timestamp: new Date().toISOString(),
        }],
      }),
    })
  } catch {
    // Webhook failure should not block the request
  }
}
