import axios from './apiClient'

// 거래 등록
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transactions`, transactionData)
    return response.data
  } catch (error) {
    console.error('💥 거래 등록 실패:', error)
    throw error
  }
}

// 거래 삭제
export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/transactions/${transactionId}`)
    return response.data
  } catch (error) {
    console.error('💥 거래 삭제 실패:', error)
    throw error
  }
}

export const getTransactionById = (id) => {
  return axios.get(`/api/Title/${id}`)
}

export const updateTransaction = (id, payload) => {
  return axios.put(`/api/Title/${id}`, payload)
}

export const getTransactions = async () => {
  return axios.get('/items')
}
