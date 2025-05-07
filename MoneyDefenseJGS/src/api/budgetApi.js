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

// 예산 가져오기 (GET) - 월별
export async function fetchBudgetByMonth(userId, month) {
  try {
    const response = await axios.get('/budget', {
      params: { userId, month },
    })

    console.log('API 응답 상태:', response.status) // 응답 상태 확인
    console.log('API 응답 데이터:', response.data) // 실제 데이터 확인

    // 응답이 배열인지 확인
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0] // 첫 번째 객체만 반환 (예산 데이터)
    } else {
      console.warn('예산 데이터 없음')
      return null // 예산 데이터가 없으면 null 반환
    }
  } catch (error) {
    console.error('API 호출 오류:', error)
    return null // 오류 발생 시 null 반환
  }
}

export async function updateBudget(userId, month, newAmount) {
  const res = await axios.get(`/budget`, {
    params: { userId, month },
  })

  const matchingData = res.data

  if (matchingData.length > 0) {
    const latest = matchingData[matchingData.length - 1]
    return axios.patch(`/budget/${latest.id}`, {
      userId,
      month,
      amount: newAmount,
      lastModified: new Date().toISOString().slice(0, 10),
    })
  } else {
    return axios.post(`/budget`, {
      userId,
      month,
      amount: newAmount,
      lastModified: new Date().toISOString().slice(0, 10),
    })
  }
}
