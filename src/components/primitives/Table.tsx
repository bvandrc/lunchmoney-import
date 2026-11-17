import {
  type ColumnDef,
  createColumnHelper,
  createSortedRowModel,
  type RowData,
  rowSortingFeature,
  type SortingState,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

import { cn } from '@/utils'

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { text: sortFn_text },
})

type SortDirection = 'asc' | 'desc' | 'none'

const SORT_INDICATOR = {
  asc: ' ▲',
  desc: ' ▼',
  none: '',
} satisfies Record<SortDirection, string>

const ARIA_SORT = {
  asc: 'ascending',
  desc: 'descending',
  none: 'none',
} satisfies Record<SortDirection, React.AriaAttributes['aria-sort']>

/**
 * A column helper for `Table`, typed by the row shape.
 *
 * Its columns can sort (`sortFn: 'text'` for strings; numbers need nothing) and render cells with `cell`.
 */
export const createTableColumnHelper = <TData extends RowData>() =>
  createColumnHelper<typeof features, TData>()

export type TableColumns<TData extends RowData> = ColumnDef<
  typeof features,
  TData,
  // biome-ignore lint/suspicious/noExplicitAny: each column has its own value type; TanStack's own `columns` helper returns the same.
  any
>[]

export type TableProps<TData extends RowData> = {
  /** From `createTableColumnHelper().columns([...])`, kept stable (module scope or memoized). */
  columns: TableColumns<TData>
  /** Kept stable between renders, so the rows aren't rebuilt each time. */
  data: TData[]
  initialSorting?: SortingState
  /** Extra classes for a column's header and cells, by column id. */
  columnClasses?: Partial<Record<string, string>>
}

/**
 * A sortable table of `data`, one column per entry in `columns`.
 *
 * Clicking a sortable column's header cycles its sort. Renders in a bordered box that scrolls sideways when it doesn't fit.
 */
export const Table = <TData extends RowData>({
  columns,
  data,
  initialSorting = [],
  columnClasses = {},
}: TableProps<TData>) => {
  const table = useTable({
    features,
    columns,
    data,
    initialState: { sorting: initialSorting },
  })

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-ink-muted">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => {
                const { column } = header
                const sort = column.getIsSorted() || 'none'
                return (
                  <th
                    key={header.id}
                    aria-sort={
                      column.getCanSort() ? ARIA_SORT[sort] : undefined
                    }
                    className={cn(
                      'px-3 py-2 font-medium whitespace-nowrap',
                      columnClasses[column.id]
                    )}>
                    {column.getCanSort() ? (
                      <button
                        type="button"
                        onClick={column.getToggleSortingHandler()}
                        className="hover:text-ink">
                        <table.FlexRender header={header} />
                        {SORT_INDICATOR[sort]}
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
                    columnClasses[cell.column.id]
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
