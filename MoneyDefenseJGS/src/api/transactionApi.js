import axios from 'axios'

const API_BASE_URL = 'https://your-api-url.com/api' // 여기를 실제 서버 URL로 변경하세요

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
