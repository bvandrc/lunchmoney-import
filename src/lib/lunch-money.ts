/**
 * @fileoverview The Lunch Money API client, built from the token in `.env.local`.
 */

import { LunchMoneyClient } from '@lunch-money/lunch-money-js-v2'

const API_KEY = import.meta.env.VITE_LUNCH_MONEY_API_KEY

/** The API client, or `null` when no token is configured. */
export const lunchMoney = API_KEY
  ? new LunchMoneyClient({ apiKey: API_KEY })
  : null
