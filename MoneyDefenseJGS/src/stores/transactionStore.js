import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    amount: '',
    partner: '',
    category: '',
    paymentMethods: '', // 변수 이름 수정"s"추가
    type: '',
    date: '',
    memo: '',
  }),
  actions: {
    reset() {
      this.amount = ''
      this.partner = ''
      this.category = ''
      this.paymentMethods = ''
      this.type = ''
      this.date = ''
      this.memo = ''
    },
    setTransaction(data) {
      // 수정 모드에 대응
      this.amount = data.amount
      this.partner = data.partner
      this.category = data.category
      this.paymentMethods = data.paymentMethods
      this.type = data.type
      this.date = data.date
      this.memo = data.memo
    },
  },
})
