import * as axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '6291790e-1f79-4619-9324-d561afa90022'
  }
})

export const usersApi = {

  getUsers(pageCount, currentPage) {
    return instance.get
    (`users?count=${pageCount}&page=${currentPage}`)
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

export const authApi = {
  getAuth() {
    return instance.get(`auth/me`)
      .then(response => response.data)
  },

  authorize(formData) {
    return instance.post('/auth/login', formData)
      .then(response => response.data)
  }

}

export const profileApi = {

  getUser(userId) {
    return instance.get(`profile/` + userId)
      .then(response => response.data)
  },

  getStatus(userId) {
    return instance.get(`profile/status/` + userId)
      .then(response => response.data)
  },

  updateStatus(status) {
    return instance.put('profile/status', {status: status})
      .then(response => response.data)
  }
}
