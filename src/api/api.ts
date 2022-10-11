import axios, {AxiosResponse} from "axios";

export enum ResultCodeEnum {
  success = 0,
  error
}



const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '6291790e-1f79-4619-9324-d561afa90022'
  }
})

export const usersApi = {
  getUsers(pageCount: number, currentPage: number) {
    return instance.get
    (`users?count=${pageCount}&page=${currentPage}`)
      .then(response => response.data)
  },

  follow(id: number) {
    return instance.post('follow/' + id)
      .then(response => response.data)
  },

  unfollow(id: number) {
    return instance.delete('follow/' + id)
      .then(response => response.data)
  }
}

type AuthDataType = {
  data: {
    id: number
    login: string
    email: string
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

type LoginDataType = {
  data: {
    userId: number
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}


type LogoutDataType = {
  data: {
  }
  resultCode: ResultCodeEnum
  messages: Array<string>
}

  export const authApi = {
    getAuth() {
      return instance.get<AuthDataType>(`auth/me`)
          .then(response => response.data)
    },


  authorize(formData: {login: string, password: string}) {
    return instance.post<LoginDataType>('/auth/login', formData)
      .then(response => response.data)
  },

  logout() {
    return instance.delete<LogoutDataType>('auth/login')
      .then(response=>response.data)
  }
}

export const profileApi = {
  getUser(userId: number) {
    return instance.get(`profile/` + userId)
      .then(response => response.data)
  },

  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId)
      .then(response => response.data)
  },

  updateStatus(status: string) {
    return instance.put('profile/status', {status: status})
      .then(response => response.data)
  },

  updateAvatar(file: any) {
    const formData = new FormData();
    formData.append("image", file);
    return instance.put(
      'profile/photo',
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  },

  uploadProfile(formData: any) {
    return instance.put('profile', formData)
      .then((data)=> {
        if (data.data.resultCode!==ResultCodeEnum.success) return Promise.reject(data.data.messages[0])
      })
  }
}

