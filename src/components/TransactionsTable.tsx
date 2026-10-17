import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

import type { TransactionRow } from '@/hooks/useTransactionRows'
import { cn } from '@/utils'

const AMOUNT_FORMAT = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { text: sortFn_text },
})

const helper = createColumnHelper<typeof features, TransactionRow>()

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
    cell: (info) => (info.getValue() ? 'Yes' : 'No'),
  }),
])

const SORT_INDICATOR = {
  asc: ' ▲',
  desc: ' ▼',
  none: '',
} satisfies Record<'asc' | 'desc' | 'none', string>

const ARIA_SORT = {
  asc: 'ascending',
  desc: 'descending',
  none: 'none',
} satisfies Record<'asc' | 'desc' | 'none', React.AriaAttributes['aria-sort']>

export type TransactionsTableProps = {
  rows: TransactionRow[]
}

/** Transactions in a table, newest first, sortable by clicking a column header. */
export const TransactionsTable = ({ rows }: TransactionsTableProps) => {
  const table = useTable({
    features,
    columns,
    data: rows,
    initialState: { sorting: [{ id: 'date', desc: true }] },
  })

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-ink-muted">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted() || 'none'
                return (
                  <th
                    key={header.id}
                    aria-sort={ARIA_SORT[sorted]}
                    className="px-3 py-2 font-medium whitespace-nowrap">
                    {header.column.getCanSort() ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="hover:text-ink">
                        <table.FlexRender header={header} />
                        {SORT_INDICATOR[sorted]}
                      </button>
                    ) : (
                      <table.FlexRender header={header} />
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-border">
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  className={cn(
                    'px-3 py-2 align-top',
                    cell.column.id === 'amount' && 'text-right tabular-nums'
                  )}>
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
