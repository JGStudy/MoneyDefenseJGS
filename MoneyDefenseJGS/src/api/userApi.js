import axios from './apiClient'

// GET
export const getUserById = (id) => {
  return axios.get(`/Profile/${id}`)
} // 특정 id

// POST
export const createUser = async (userName) => {
  const response = await axios.post('/Profile', { name: userName })
  return response.data
}

/**
 * 전체 사용자 목록을 가져오는 함수
 * @returns {Promise<AxiosResponse>} 모든 사용자 데이터가 담긴 객체
 */
export const getAllUsers = () => {
  return axios.get('/Profile')
}


