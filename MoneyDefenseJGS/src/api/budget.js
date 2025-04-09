import axios from 'axios'

// 예산 가져오기 (GET)
export function fetchMonthlyBudget(month) {
  return axios.get(`/month?monthly=${month}`)
}

// 예산 수정 (PATCH)
export function updateMonthlyBudget(month, newAmount) {
  const today = new Date().toISOString().split('T')[0]
  return axios.patch(`/month/${monthId}`, {
    budget: newAmount,
  })
}
