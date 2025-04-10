// src/api/transactionApi.js
import axios from './apiClient'
import { format } from 'date-fns'

export const getTransactionById = (id) => {
  return axios.get(`/Title/${id}`)
}

// export const createTransaction = (payload) => {
//   return axios.post('/Title', payload)
// }

export const updateTransaction = (id, payload) => {
  return axios.put(`/Title/${id}`, payload)
}

export const getTransactions = async () => {
  return axios.get('/items')
}

// 거래 등록
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post('/transactions', transactionData)
    return response.data
  } catch (error) {
    console.error('💥 거래 등록 실패:', error)
    throw error
  }
}

// 거래 삭제
export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.delete(`/transactions/${transactionId}`)
    return response.data
  } catch (error) {
    console.error('💥 거래 삭제 실패:', error)
    throw error
  }
}

// 하연 사용
export const getFilteredDailyTransactions = async (date, selectedTypes = []) => {
  const target = format(date, 'yyyy-MM-dd')
  try {
    const { data } = await axios.get('/Title')
    return data.filter((tx) => tx.date === target && selectedTypes.includes(tx.type))
  } catch (err) {
    console.error('필터링 실패:', err)
    return []
  }
}

export const getAllTransactions = async () => {
  const { data } = await axios.get('/items')
  return data
}
