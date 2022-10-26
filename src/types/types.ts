export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileType = {
    userId?: number|null
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    contacts?: ContactsType
    photos?: PhotosType
    aboutMe?: string
}

export type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type FriendType = {
    id: number
    name: string
    avatar: string
}

export type MessageType = {
    id: number
    message: string,
    me: boolean,
    name: string
    date: string
}

export type DialogType = {
    id: number
    name: string
    avatar: string
}

export type FilterType = {
    term: string,
    friend: null | boolean
}

