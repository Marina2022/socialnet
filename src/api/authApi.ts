import {instance, APIResponseType} from "./api";

type AuthDataType = {
    id: number
    login: string
    email: string
}
type LoginDataType = {
    userId: number
}

export const authApi = {
    getAuth() {
        return instance.get<APIResponseType<AuthDataType>>(`auth/me`)
            .then(response => response.data)
    },

    authorize(formData: { login: string, password: string }) {
        return instance.post<APIResponseType<LoginDataType>>('/auth/login', formData)
            .then(response => response.data)
    },

    logout() {
        return instance.delete<APIResponseType>('auth/login')
            .then(response => response.data)
    }
}