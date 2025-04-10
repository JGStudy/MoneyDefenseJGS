import axios from './apiClient'

// get
export const getMoney=()=>{
    return axios.get('/monthlyData')
}

export const totalMoney=()=>{
    return axios.get('/totalmoney')
}

export const categories=()=>{
    return axios.get('/categoryExpenses')
}


// 기존 월에 순자산만 추가
export const updateNetAssets = async (month, netAssets) => {
    // 먼저 해당 month가 있는지 조회
    const existing = await axios.get(`/monthlyData?month=${month}`)
  
    if (existing.data.length > 0) {
      const id = existing.data[0].id // 해당 month의 id
      return axios.patch(`/monthlyData/${id}`, { netAssets }) // netAssets만 업데이트
    } else {
      throw new Error('해당 월의 데이터가 없습니다!')
    }
}


