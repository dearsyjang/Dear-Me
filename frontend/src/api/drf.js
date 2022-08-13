// const HOST = 'http://localhost:8080/api/'
const HOST = "https://i7d206.p.ssafy.io"
const MEMBER = '/users'
const BOARD ='/boards'
const COMMENT ='/comments'
const COUNSELOR = '/counselors'

export default {
  member : {
    login: () => HOST + MEMBER + '/token',
    logout: () => HOST + MEMBER + '/token',
    signup: () => HOST + MEMBER,
    // currentUserInfo: () => HOST + MEMBER + '/token',
    currentUser: () => HOST + MEMBER,// 정보수정
    idCheck: () => HOST + MEMBER + '/id',
    // profile: username => HOST + MEMBER + 'profile/' + username,
    // profile: () => HOST + MEMBER 
    profileEdit: () => HOST + MEMBER
  },
  board : {
    boardCreate: () => HOST + BOARD,
    boardsList: () => HOST + BOARD,
    boardDetail: boardPk => HOST + BOARD + `/${boardPk}`,
    boardEdit: boardPk => HOST + BOARD + `/${boardPk}`,
    commentCreate: boardPk => HOST + BOARD + `/${boardPk}` + COMMENT,
    commentEdit: (boardPk, commentPk) => HOST + BOARD + `/${boardPk}` + COMMENT + `/${commentPk}`
  },
  counselors: {
     counselors : () => HOST + COUNSELOR,
     counselor : (counselorId) => HOST + COUNSELOR  + `/${counselorId}`,
    // filter : (categoryId) => HOST + MEMBER + '/filter' +  `/${categoryId}`,
    // search : (keyword) => HOST + MEMBER + '/search' +  `/${keyword}`,
  }


}