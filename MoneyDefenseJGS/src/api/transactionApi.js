// src/api/transactionApi.js
import axios from './apiClient'
import { format } from 'date-fns'

export const getTransactionById = (id) => {
  return axios.get(`/Title/${id}`)
}

export const createTransaction = (payload) => {
  return axios.post('/Title', payload)
}

export const updateTransaction = (id, payload) => {
  return axios.put(`/Title/${id}`, payload)
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
