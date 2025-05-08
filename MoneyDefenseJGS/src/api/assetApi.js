import axios from './apiClient'

// 자산 가져오기 (GET)
export const fetchAsset = (userId) => axios.get(`/asset?userId=${userId}`)

export async function updateAssetById(userId, newAmount) {
  const today = new Date().toISOString().split('T')[0]

  // 1. 동일 날짜 + 유저 ID로 데이터 존재하는지 확인
  const res = await axios.get(`/asset?userId=${userId}&lastModified=${today}`)
  const existing = res.data[0]

  if (existing) {
    // 2. 있으면 PATCH로 덮어쓰기
    return axios.patch(`/asset/${existing.id}`, {
      totalAsset: newAmount,
    })
  } else {
    // 3. 없으면 POST로 새로 추가
    return axios.post('/asset', {
      userId,
      totalAsset: newAmount,
      lastModified: today,
    })
  }
}

// 거래 내역 가져오기
export function fetchTransactions() {
  return axios.get('/Transaction')
}

//하연 사용
// Post
export const createAsset = async (userId, amount) => {
  const today = new Date().toISOString().split('T')[0]

  const response = await axios.post('/asset', {
    userId,
    totalAsset: amount,
    lastModified: today,
  })

  return response.data // { id, userId, totalAsset, lastModified }
}

// Get
export const getAssetByUserId = async (userId) => {
  const response = await axios.get(`/asset?userId=${userId}`)
  return response.data[0]
}

// 자산 추이 가져오기
export const fetchAssetTrend = (userId) => {
  return axios.get(`/assetHistory?userId=${userId}`)
}

export async function getAsset() {
  const res = await axios.get('/asset')
  return res.data
}
