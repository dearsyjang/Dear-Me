import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

// import _ from 'lodash'

export default {
  state: {
    // 회원가입때 생성된 토큰을 로컬스토리지에서 조회
    token: localStorage.getItem('token') || '',
    // 로그인된 사용자
    currentUser: {},
    authError: null,
  },
  getters: {
    // 로그인, 로그아웃 경우에 현재 사용자 업데이트
    currentUser: state => state.currentUser,
    // 현재 사용자의 토큰을 나타냄 (요청 보낼 때, header에서 사용)
    authHeader: state => ({ Authorization: `Token ${state.currentUser}`}),
    authError: state => state.authError,
  },
  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_AUTH_ERROR: (state, error) => state.authError = error,
  },
  actions: {
    // 회원가입
    saveToken({ commit }, token) {
      commit('SET_TOKEN', token)
      // 회원가입시 받은 토큰을 로컬스토리지에 추가
      localStorage.setItem('token', token)
    },
    // 로그아웃
    removeToken({ commit }) {
      // 현재 사용자 비움
      commit('SET_CURRENT_USER', '')
      // localStorage.setItem('token', '')
    },
    // 받아오는 데이터가 한개일 경우 입력, 여러개일 경우 {}안에 담아와야함
    login({ commit }, data) {
      axios({
        // url: 'https://i7d206.p.ssafy.io/users/token?id=id1&pw=pw1',
        url: drf.member.login()+`?id=${data.id}&pw=${data.pw}`,
        method: 'get'
      })
        .then(res => {
          const token = res.data.data.accessToken
          // const access = token.accessToken
          console.log(token)
          // console.log(access)
          // console.log(res.data)
          // console.log(res.data.accessToken)
          // console.log('token', token)
          // token에 accessToken, refreshToken 둘 다 들어감 (이 부분 수정 필요)
          // console.log(token)
          // 현재 사용자 업데이트
          commit('SET_CURRENT_USER', token)
          // dispatch('fetchCurrentUser', token)
          // console.log(getters.currentUser)
          // console.log(getters.authHeader)
          router.push({ name: 'mypageUser' })
        })
        .catch(err => {
          console.error(err)
          console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },
    // POST 요청일 경우 FormData로 보내야함 (SignupUserView 참고)
    signup({ commit, dispatch }, formData) {
      axios({
        url: drf.member.signup(),
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
          // console.log(res)
          // console.log(res.data)
          const token = res.data
          // console.log(token)
          // 로컬스토리지에 토큰 저장
          dispatch('saveToken', token)
          alert('save token성공')
          // 여기서 바로 마이페이지로 넘어갈지 고민중..
          router.push({ name: 'login' })
        })
        .catch((err) => {
          console.error(err)
          console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },
    // 로그아웃은 별도 요청 없이 현재 사용자 리셋
    logout({ dispatch, getters}) {
      dispatch('removeToken')
      console.log(getters.currentUser)
      router.push({ name: 'login' })
    },
  },
}
