import type { FC, Child } from 'hono/jsx'

const Layout: FC<{ title: string; children: Child }> = ({ title, children }) => (
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <style>{`
        :root {
          --color-bg: #f8f7f4;
          --color-surface: #ffffff;
          --color-border: #e8e6e1;
          --color-border-hover: #d4d1ca;
          --color-text: #1a1a1a;
          --color-text-secondary: #6b6b6b;
          --color-text-muted: #9b9b9b;
          --color-primary: #6366f1;
          --color-primary-hover: #4f46e5;
          --color-primary-active: #4338ca;
          --color-danger: #ef4444;
          --color-danger-hover: #dc2626;
          --color-success-bg: #ecfdf5;
          --color-success-text: #065f46;
          --color-success-border: #a7f3d0;
          --color-error-bg: #fef2f2;
          --color-error-text: #991b1b;
          --color-error-border: #fecaca;
          --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
          --shadow-md: 0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --shadow-lg: 0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
          --radius-sm: 6px;
          --radius-md: 10px;
          --radius-lg: 14px;
          --transition: 150ms ease;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", Meiryo, Roboto, sans-serif;
          background: var(--color-bg);
          color: var(--color-text);
          line-height: 1.7;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        /* Page wrapper - viewport center */
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
        }

        /* Containers */
        .container--narrow {
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
        }
        .container--narrow.container--login {
          max-width: 400px;
        }
        .container--wide {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        @media (min-width: 768px) {
          .container--wide { max-width: 960px; padding: 3rem 2rem; }
        }
        @media (min-width: 1280px) {
          .container--wide { max-width: 1080px; }
        }

        /* Page header */
        .page-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .page-header__icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.5rem;
        }
        .page-header__title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text);
        }
        .page-header__subtitle {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-top: 0.25rem;
        }
        @media (min-width: 768px) {
          .page-header__icon { font-size: 3rem; }
          .page-header__title { font-size: 1.75rem; }
        }

        /* Cards */
        .card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        .card--elevated {
          box-shadow: var(--shadow-md);
        }
        @media (min-width: 768px) {
          .card { padding: 2rem; }
        }

        /* Form elements */
        label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }
        textarea, input[type="password"] {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-family: inherit;
          line-height: 1.6;
          resize: vertical;
          background: var(--color-bg);
          color: var(--color-text);
          transition: border-color var(--transition), box-shadow var(--transition);
        }
        textarea:focus, input[type="password"]:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
          background: var(--color-surface);
        }
        .input-hint {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-top: 0.4rem;
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background var(--transition), box-shadow var(--transition), transform var(--transition);
          width: 100%;
          margin-top: 1rem;
        }
        .btn:active { transform: scale(0.98); }
        .btn--primary {
          background: var(--color-primary);
          color: #fff;
        }
        .btn--primary:hover { background: var(--color-primary-hover); box-shadow: var(--shadow-md); }
        .btn--primary:active { background: var(--color-primary-active); }
        .btn--danger {
          background: var(--color-danger);
          color: #fff;
          width: auto;
          margin: 0;
          padding: 0.35rem 0.85rem;
          font-size: 0.8rem;
          border-radius: var(--radius-sm);
        }
        .btn--danger:hover { background: var(--color-danger-hover); }
        .btn--ghost {
          background: transparent;
          color: var(--color-text-secondary);
          padding: 0.5rem 0.75rem;
          font-size: 0.85rem;
          width: auto;
          margin: 0;
        }
        .btn--ghost:hover { color: var(--color-text); background: rgba(0,0,0,0.04); }

        /* Messages */
        .message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .message__icon { flex-shrink: 0; font-size: 1.1rem; }
        .message--success {
          background: var(--color-success-bg);
          color: var(--color-success-text);
          border: 1px solid var(--color-success-border);
        }
        .message--error {
          background: var(--color-error-bg);
          color: var(--color-error-text);
          border: 1px solid var(--color-error-border);
        }

        /* Anonymous badge */
        .anon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-top: 1.25rem;
        }
        .anon-badge__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #34d399;
          flex-shrink: 0;
        }

        /* Admin header */
        .admin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .admin-header__title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .stats-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--color-primary);
          color: #fff;
          padding: 0.3rem 0.85rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Opinion cards */
        .opinion-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        @media (min-width: 1024px) {
          .opinion-list { grid-template-columns: 1fr 1fr; }
        }
        .opinion-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          transition: box-shadow var(--transition), border-color var(--transition);
        }
        .opinion-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--color-border-hover);
        }
        .opinion-card__body {
          white-space: pre-wrap;
          word-break: break-word;
          line-height: 1.7;
          font-size: 0.95rem;
        }
        .opinion-card__meta {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-top: 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--color-border);
        }

        /* Empty state */
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--color-text-muted);
        }
        .empty-state__icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.75rem;
        }
        .empty-state__text {
          font-size: 0.95rem;
        }

        /* Back link */
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--color-text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          margin-top: 1.5rem;
          transition: color var(--transition);
        }
        .back-link:hover { color: var(--color-primary); }
      `}</style>
    </head>
    <body>
      {children}
    </body>
  </html>
)

export default Layout
