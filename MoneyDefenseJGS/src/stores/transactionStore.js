import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    // id: '',
    userid: '1', // 로그인 사용자 또는 기본값으로 설정
    date: '',
    type: '',
    category: '',
    amount: 0,
    memo: '',
    source: '',
    create_date: '',
    update_date: '',
  }),
  actions: {
    resetTransaction() {
      this.id = ''
      this.date = ''
      this.type = ''
      this.category = ''
      this.amount = 0
      this.memo = ''
      this.source = ''
      this.create_date = ''
      this.update_date = ''
    },
    setTransaction(data) {
      this.id = data.id
      this.userid = data.userid
      this.date = data.date
      this.type = data.type
      this.category = data.category
      this.amount = data.amount
      this.memo = data.memo
      this.source = data.source
      this.create_date = data.create_date
      this.update_date = data.update_date
    },
  },
})
