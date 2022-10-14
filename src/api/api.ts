import axios from "axios";

export enum ResultCodeEnum {
    success = 0,
    error
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '6291790e-1f79-4619-9324-d561afa90022'
    }
})

export type APIResponseType<T={}> = {
    data: T
    resultCode: ResultCodeEnum
    messages: Array<string>
}