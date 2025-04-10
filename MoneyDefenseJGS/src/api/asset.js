import axios from './apiClient'

// 자산 가져오기 (GET)
export const fetchAsset = (userId) => axios.get(`/asset?userId=${userId}`)

// 자산 수정 (PATCH)
export function updateAssetById(assetId, newAmount) {
  const today = new Date().toISOString().split('T')[0]
  return axios.patch(`/asset/${assetId}`, {
    totalAsset: newAmount,
    lastModified: today,
  })
}

// 거래 내역 가져오기
export function fetchTransactions() {
  return axios.get('/transactions')
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
