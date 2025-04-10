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
