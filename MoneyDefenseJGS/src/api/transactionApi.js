// src/api/transactionApi.js
import axios from 'axios'

export const getTransactionById = (id) => {
  return axios.get(`/api/Title/${id}`)
}

export const createTransaction = (payload) => {
  return axios.post('/api/Title', payload)
}

export const updateTransaction = (id, payload) => {
  return axios.put(`/api/Title/${id}`, payload)
}
