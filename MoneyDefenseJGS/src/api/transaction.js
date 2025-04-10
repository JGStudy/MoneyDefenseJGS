// src/api/transaction.js
import axios from './apiClient'

export const getTransactions = async () => {
  try {
    const res = await axios.get('/transaction')
    return res.data
  } catch (error) {
    console.error('거래 내역 API 호출 실패:', error)
    throw error
  }
}
