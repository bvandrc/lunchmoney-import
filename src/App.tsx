import { TransactionsTable } from '@/components/TransactionsTable'
import { lunchMoney } from '@/lib/lunch-money'

import './styles/index.css'

export const App = () => (
  <main className="mx-auto flex min-h-dvh max-w-7xl flex-col gap-6 px-5 py-12">
    <h1 className="text-3xl font-semibold tracking-tight">lunchmoney-import</h1>
    {lunchMoney ? (
      <TransactionsTable />
    ) : (
      <p className="text-tone-caution">
        No API token. Copy <code>.env.example</code> to <code>.env.local</code>,
        set <code>VITE_LUNCH_MONEY_API_KEY</code>, and restart the dev server.
      </p>
    )}
  </main>
)
