import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    id: null,
    partner: '',
    category: '',
    amount: 0,
    memo: '',
    date: '',
    type: 'expense',
  }),
  actions: {
    setTransaction(payload) {
      Object.assign(this, payload)
    },
    getPayload() {
      return {
        id: this.id,
        partner: this.partner,
        category: this.category,
        amount: this.amount,
        memo: this.memo,
        date: this.date,
        type: this.type,
      }
    },
  },
})
