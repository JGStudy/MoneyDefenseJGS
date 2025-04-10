// stores/transactionStore.js
import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],

    amount: '', // 금액
    partner: '', // 거래처
    type: '', // 분류
    category: '', // 카테고리
    paymentMethod: '', // 결제 수단
    date: '', // 날짜
    memo: '', // 메모
  }),
  actions: {
    add(transaction) {
      this.transactions.push(transaction)
    },
    reset() {
      this.amount = ''
      this.partner = ''
      this.type = ''
      this.category = ''
      this.paymentMethod = ''
      this.date = ''
      this.memo = ''
    },
  },
})
