import * as axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '6291790e-1f79-4619-9324-d561afa90022'
  }
})

const usersApi = {

  getUsers(pageCount, currentPage) {
    return instance.get
    (`users?count=${pageCount}&page=${currentPage}`)
      .then(response => response.data)
  },

  getUser(userId) {
    return instance.get(`profile/` + userId)
      .then(response => response.data)
  },

  getAuth(){
    return instance.get(`auth/me`)
      .then(response => response.data)
  },

  follow(id) {
    return instance.post('follow/' + id)
      .then(response => response.data)
  },

  unfollow(id) {
    return instance.delete('follow/' + id)
      .then(response => response.data)
  }


}
export default usersApi;