import axios from './apiClient'

// 자산 가져오기 (GET)
export function fetchAsset() {
  return axios.get('/asset')
}

// 자산 수정 (PATCH) — id가 1번이라고 가정
export function updateAsset(newAmount) {
  const today = new Date().toISOString().split('T')[0]
  return axios.patch('/asset/1', {
    totalAsset: newAmount,
    lastModified: today,
  })
}

// 거래 내역 가져오기
export function fetchTransactions() {
  return axios.get('/transactions')
}

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
