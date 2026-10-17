import { useMemo } from 'react'
import type { Tag } from '@lunch-money/lunch-money-js-v2'
import { useQuery } from '@tanstack/react-query'
import { keyBy } from 'es-toolkit'

import { lunchMoney } from '@/api/lunch-money'

/** A transaction with its category and tags resolved to names, ready to display. */
export type TransactionRow = {
  id: number
  payee: string
  date: string
  /** In the account's primary currency; positive is money out. */
  amount: number
  category: string | null
  tags: Tag[]
  notes: string | null
  reviewed: boolean
}

/**
 * The most recent posted (non-pending) transactions, joined to their category and tag names.
 *
 * `hasMore` is true when Lunch Money had more transactions than one page returned.
 */
export const useTransactionRows = () => {
  const transactions = useQuery({
    queryKey: ['transactions'],
    queryFn: () => client().transactions.getAll({ is_pending: false }),
  })
  const categories = useQuery({
    queryKey: ['categories'],
    // Flattened, so categories inside a group are listed alongside the groups.
    queryFn: () => client().categories.getAll({ format: 'flattened' }),
  })
  const tags = useQuery({
    queryKey: ['tags'],
    queryFn: () => client().tags.getAll(),
  })

  const rows = useMemo(() => {
    if (!transactions.data || !categories.data || !tags.data) return undefined
    const categoriesById = keyBy(categories.data, (c) => c.id)
    const tagsById = keyBy(tags.data, (t) => t.id)
    return transactions.data.transactions.map(
      (t): TransactionRow => ({
        id: t.id,
        payee: t.payee,
        date: t.date,
        amount: t.to_base,
        category:
          t.category_id === null
            ? null
            : (categoriesById[t.category_id]?.name ?? null),
        tags: t.tag_ids.flatMap((id) => tagsById[id] ?? []),
        notes: t.notes,
        reviewed: t.status === 'reviewed',
      })
    )
  }, [transactions.data, categories.data, tags.data])

  return {
    rows,
    hasMore: transactions.data?.hasMore ?? false,
    error: transactions.error ?? categories.error ?? tags.error,
  }
}

const client = () => {
  if (!lunchMoney) throw new Error('VITE_LUNCH_MONEY_API_KEY is not set')
  return lunchMoney
}
