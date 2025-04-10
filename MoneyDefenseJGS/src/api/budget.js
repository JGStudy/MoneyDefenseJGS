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
export const fetchBudgetByMonth = async (month) => {
  const res = await axios.get(`/budgetmap?month=${month}`)
  return res.data
}

// 예산 수정 (PUT 또는 PATCH)
export async function updateBudget(month, newAmount) {
  const res = await axios.get(`/budgetmap?month=${month}`)
  const matchingData = res.data

  // 해당 월 데이터가 있다면 PATCH, 없으면 POST
  if (matchingData.length > 0) {
    const latest = matchingData[matchingData.length - 1] // 최신 예산
    return axios.patch(`/budgetmap/${latest.id}`, {
      month,
      amount: newAmount,
    })
  } else {
    return axios.post(`/budgetmap`, {
      month,
      amount: newAmount,
    })
  }
}
