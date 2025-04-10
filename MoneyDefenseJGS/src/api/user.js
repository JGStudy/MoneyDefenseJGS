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
