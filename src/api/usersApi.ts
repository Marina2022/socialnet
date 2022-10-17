import {APIResponseType, instance} from "./api";
import {FilterType, UserType} from "../types/types";

type getUsers = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersApi = {
    getUsers(pageCount: number, currentPage: number, filter: FilterType) {
        return instance.get<getUsers>
        (`users?count=${pageCount}&page=${currentPage}&term=${filter.term}&friend=${filter.friend}`) // pageCount = how many users per page
            .then(response => response.data)
    },

    follow(id: number) {
        return instance.post<APIResponseType>('follow/' + id)
            .then(response => response.data)
    },

    unfollow(id: number) {
        return instance.delete<APIResponseType>('follow/' + id)
            .then(response => response.data)
    }
}