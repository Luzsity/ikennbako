import type { FC, Child } from 'hono/jsx'

const Layout: FC<{ title: string; children: Child }> = ({ title, children }) => (
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: #f5f5f5;
          color: #333;
          line-height: 1.6;
          min-height: 100vh;
        }
        .container {
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        @media (min-width: 768px) {
          .container { padding: 3rem 2rem; }
          h1 { font-size: 1.75rem; }
          .card { padding: 2rem; }
        }
        h1 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .card {
          background: #fff;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 1rem;
        }
        textarea, input[type="password"] {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
        }
        textarea:focus, input[type="password"]:focus {
          outline: none;
          border-color: #4a90d9;
          box-shadow: 0 0 0 2px rgba(74,144,217,0.2);
        }
        button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #4a90d9;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          width: 100%;
          margin-top: 1rem;
        }
        button:hover { background: #3a7bc8; }
        button.danger { background: #d9534f; }
        button.danger:hover { background: #c9302c; }
        .message {
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          text-align: center;
        }
        .message.success { background: #d4edda; color: #155724; }
        .message.error { background: #f8d7da; color: #721c24; }
        .opinion-item {
          border-bottom: 1px solid #eee;
          padding: 1rem 0;
        }
        .opinion-item:last-child { border-bottom: none; }
        .opinion-meta {
          font-size: 0.85rem;
          color: #888;
          margin-top: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .empty { text-align: center; color: #888; padding: 2rem 0; }
      `}</style>
    </head>
    <body>
      <div class="container">
        {children}
      </div>
    </body>
  </html>
)

export default Layout
