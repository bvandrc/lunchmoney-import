import { lunchMoney } from '@/api/lunch-money'
import { TransactionsTable } from '@/components/TransactionsTable'
import { useTransactionRows } from '@/hooks/useTransactionRows'
import { pluralize } from '@/utils'

import './styles/index.css'

export const App = () => (
  <main className="mx-auto flex min-h-dvh max-w-7xl flex-col gap-6 px-5 py-12">
    <h1 className="text-3xl font-semibold tracking-tight">lunchmoney-import</h1>
    {lunchMoney ? (
      <Transactions />
    ) : (
      <p className="text-tone-caution">
        No API token. Copy <code>.env.example</code> to <code>.env.local</code>,
        set <code>VITE_LUNCH_MONEY_API_KEY</code>, and restart the dev server.
      </p>
    )}
  </main>
)

const Transactions = () => {
  const { rows, hasMore, error } = useTransactionRows()

  if (error) {
    return (
      <p role="alert" className="text-tone-caution">
        Couldn't load transactions: {error.message}
      </p>
    )
  }
  if (!rows) return <p className="text-ink-muted">Loading transactions…</p>

  return (
    <>
      <p className="text-ink-muted">
        {pluralize(rows.length, 'transaction')}
        {hasMore && ' (the most recent; Lunch Money has more)'}
      </p>
      <TransactionsTable rows={rows} />
    </>
  )
}
