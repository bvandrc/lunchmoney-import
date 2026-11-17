import { CircleCheck } from 'lucide-react'

import { createTableColumnHelper, Table } from '@/components/primitives/Table'
import {
  type TransactionRow,
  useTransactionRows,
} from '@/hooks/useTransactionRows'
import { cn, pluralize } from '@/utils'

const AMOUNT_FORMAT = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const helper = createTableColumnHelper<TransactionRow>()

const REVIEW = {
  REVIEWED: { label: 'Reviewed', className: 'text-tone-positive' },
  UNREVIEWED: { label: 'Not reviewed', className: 'text-ink-muted/50' },
} satisfies Record<
  'REVIEWED' | 'UNREVIEWED',
  { label: string; className: string }
>

const columns = helper.columns([
  helper.accessor('payee', { header: 'Payee', sortFn: 'text' }),
  // ISO dates sort correctly as text.
  helper.accessor('date', { header: 'Date', sortFn: 'text' }),
  helper.accessor('amount', {
    header: 'Amount',
    cell: (info) => AMOUNT_FORMAT.format(info.getValue()),
  }),
  helper.accessor('category', {
    header: 'Category',
    sortFn: 'text',
    sortUndefined: 'last',
    cell: (info) => info.getValue() ?? '—',
  }),
  helper.accessor('tags', {
    header: 'Tags',
    enableSorting: false,
    cell: (info) => (
      <ul className="flex flex-wrap gap-1">
        {info.getValue().map((tag) => (
          <li
            key={tag.id}
            className="rounded-full bg-border px-2 py-0.5 text-xs"
            style={{
              backgroundColor: tag.background_color ?? undefined,
              color: tag.text_color ?? undefined,
            }}>
            {tag.name}
          </li>
        ))}
      </ul>
    ),
  }),
  helper.accessor('notes', {
    header: 'Notes',
    enableSorting: false,
    cell: (info) => info.getValue() ?? '',
  }),
  helper.accessor('reviewed', {
    header: 'Reviewed',
    cell: (info) => {
      const review = REVIEW[info.getValue() ? 'REVIEWED' : 'UNREVIEWED']
      return (
        <CircleCheck
          role="img"
          aria-label={review.label}
          className={cn('inline size-5', review.className)}
        />
      )
    },
  }),
])

/** Extra classes for a column's header and cells, by column id. */
const COLUMN_CLASSES: Record<string, string | undefined> = {
  date: 'whitespace-nowrap tabular-nums',
  amount: 'text-right whitespace-nowrap tabular-nums',
  reviewed: 'text-center',
}

const INITIAL_SORTING = [{ id: 'date', desc: true }]

/**
 * The account's recent transactions in a table, newest first and sortable by clicking a column header.
 *
 * Shows a loading line until the data arrives, and the error in place of the table if a request fails.
 */
export const TransactionsTable = () => {
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
      <Table
        columns={columns}
        data={rows}
        initialSorting={INITIAL_SORTING}
        columnClasses={COLUMN_CLASSES}
      />
    </>
  )
}
