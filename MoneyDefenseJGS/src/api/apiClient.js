import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api', // proxy 경로
  timeout: 5000, // 응답 관련 실패 처리
  headers: {
    'Content-Type': 'application/json',
  }, // axios.post 데이터 형식 지정
})

// 로딩 관련 추가 예정

export default apiClient
