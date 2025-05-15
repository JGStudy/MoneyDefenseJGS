import axios from './apiClient'

// GET
export const getUserById = (id) => {
  return axios.get(`/Profile/${id}`)
} // 특정 id

// userId 무작위 생성 -> 로그인 페이지 구현 후 삭제 예장
const randomUserId = () => {
  return 'user' + Math.random().toString(36).substring(2, 10)
}

// POST
export const createUser = async (userName) => {
  // const response = await axios.post('/Profile', { name: userName })
  // return response.data
  const userId = randomUserId()

  const newUser = {
    id: userId,
    name: userName,
    userId,
    password: null, // 비밀번호는 사용하지 않기 때문에 null 처리
  }

  const response = await axios.post('/Profile', newUser)
  return response.data
} // 로그인 페이지 구현 시 삭제

/**
 * 전체 사용자 목록을 가져오는 함수
 * @returns {Promise<AxiosResponse>} 모든 사용자 데이터가 담긴 객체
 */
export const getAllUsers = () => {
  return axios.get('/Profile')
}

/**
 * 회원가입용 사용자 생성 함수
 * @param {Object} newUser - 사용자 정보 객체 ({ name, userId, password })
 * @returns {Object} 생성된 사용자 정보 또는 에러 메시지
 */
export const registerUser = async (newUser) => {
  try {
    const response = await axios.post('/Profile', newUser)
    return response.data
  } catch (error) {
    // 네트워크 에러 or 서버 에러
    if (error.response) {
      // 오류코드 응답
      console.error('서버 응답 오류:', error.response)
      throw new Error(`회원가입 실패: ${error.response.statusText}`)
    } else if (error.request) {
      // 응답 없음
      console.error('응답 없음:', error.request)
      throw new Error('회원가입 실패: 서버로부터 응답이 없습니다.')
    } else {
      // 요청 설정 중 에러
      console.error('요청 중 에러:', error.message)
      throw new Error(`회원가입 실패: ${error.message}`)
    }
  }
}
