import axios from './apiClient'

export const getTransactions = async () => {
  return axios.get('/items')
}
