import axios from './apiClient'

export const getBudget = async () => {
  try {
    const res = await axios.get('/budget')
    return res.data
  } catch (error) {
    console.error('예산 데이터 가져오기 실패:', error)
    throw error
  }
}

// 예산 가져오기 (GET)
export function fetchBudgetByMonth(month) {
  return axios.get(`/budget?monthly=${month}`)
}

// 예산 수정 (PATCH)
export function updateBudget(month, newAmount) {
  const today = new Date().toISOString().split('T')[0]
  return axios.patch(`/budget/${month}`, {
    budget: newAmount,
  })
}
