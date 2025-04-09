// /stores/transaction.js
import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    amount: '',
    partner: '',
    category: '',
    method: '',
    type: '',
    date: '',
    memo: '',
  }),
  actions: {
    reset() {
      this.amount = ''
      this.partner = ''
      this.category = ''
      this.method = ''
      this.type = ''
      this.date = ''
      this.memo = ''
    },
  },
})
