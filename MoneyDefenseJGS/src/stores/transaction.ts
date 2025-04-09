import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    amount: '',
    partner: '',
    method: '',
    category: '',
    date: '',
    type: '',
    memo: '',
  }),
})
