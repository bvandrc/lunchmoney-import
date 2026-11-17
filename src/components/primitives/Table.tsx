import { cn } from '@/utils'

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

/** A full-width table in a bordered box that scrolls sideways when it doesn't fit. */
export const Table = ({
  className,
  ...props
}: React.ComponentProps<'table'>) => (
  <div className="overflow-x-auto rounded-lg border border-border">
    <table className={cn('w-full text-left text-sm', className)} {...props} />
  </div>
)

export const TableHeader = ({
  className,
  ...props
}: React.ComponentProps<'thead'>) => (
  <thead className={cn('bg-surface text-ink-muted', className)} {...props} />
)

/** A table body whose rows are divided by a border, including from the header. */
export const TableBody = ({
  className,
  ...props
}: React.ComponentProps<'tbody'>) => (
  <tbody
    className={cn('[&>tr]:border-t [&>tr]:border-border', className)}
    {...props}
  />
)

export const TableRow = (props: React.ComponentProps<'tr'>) => <tr {...props} />

export type TableHeadProps = Omit<React.ComponentProps<'th'>, 'aria-sort'> & {
  /** How the column is sorted now; only read when `onSort` is set. */
  sort?: SortDirection
  /** Makes the header a button that changes the column's sort. */
  onSort?: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

/** A column header, which is a sort button showing the current direction when `onSort` is set. */
export const TableHead = ({
  sort = 'none',
  onSort,
  className,
  children,
  ...props
}: TableHeadProps) => (
  <th
    aria-sort={onSort ? ARIA_SORT[sort] : undefined}
    className={cn('px-3 py-2 font-medium whitespace-nowrap', className)}
    {...props}>
    {onSort ? (
      <button type="button" onClick={onSort} className="hover:text-ink">
        {children}
        {SORT_INDICATOR[sort]}
      </button>
    ) : (
      children
    )}
  </th>
)

export const TableCell = ({
  className,
  ...props
}: React.ComponentProps<'td'>) => (
  <td className={cn('px-3 py-2 align-top', className)} {...props} />
)
