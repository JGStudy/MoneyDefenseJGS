import axios from './apiClient'

export const getTransactionById = (id) => {
  return axios.get(`/api/Title/${id}`)
}

export const createTransaction = (payload) => {
  return axios.post('/api/Title', payload)
}

export const updateTransaction = (id, payload) => {
  return axios.put(`/api/Title/${id}`, payload)
}

export const getTransactions = async () => {
  return axios.get('/items')
}
