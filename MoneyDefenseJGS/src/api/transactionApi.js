// src/api/transactionApi.js
import axios from './apiClient'
import { format } from 'date-fns'

export const getTransactionById = (id) => {
  return axios.get(`/Transaction/${id}`)
}

export const updateTransaction = (id, payload) => {
  return axios.put(`/Transaction/${id}`, payload)
}

export const getTransactions = async () => {
  return axios.get('/Transaction')
}

export const getCategoryIncome = () => {
  return axios.get('/categoryIncome')
}

export const getCategoryExpenses = () => {
  return axios.get('/categoryExpenses')
}

// 거래 등록
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post('/Transaction', transactionData)
    return response.data
  } catch (error) {
    console.error('💥 거래 등록 실패:', error)
    throw error
  }
}

// 거래 삭제
export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.delete(`/Transaction/${transactionId}`)
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
    const { data } = await axios.get('/Transaction')
    return data.filter((tx) => tx.date === target && selectedTypes.includes(tx.type))
  } catch (err) {
    console.error('필터링 실패:', err)
    return []
  }
}

export const getAllTransactions = async () => {
  const { data } = await axios.get('/Transaction')
  return data
}

/**
 * 특정 사용자(userId)의 거래 내역을 가져오는 함수
 * @param {string} userId - 조회할 사용자의 ID
 * @returns {Promise<AxiosResponse>} 해당 사용자의 거래 데이터 배열
 */
export const getTransactionsByUserId = async (userId) => {
  try {
    const response = await axios.get(`/Transaction?userid=${userId}`)
    return response.data
  } catch (error) {
    console.error('사용자 거래 조회 실패:', error)
    throw error
  }
}
