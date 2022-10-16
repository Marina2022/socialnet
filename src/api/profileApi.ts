import {instance, APIResponseType, ResultCodeEnum} from "./api";
import {PhotosType, ProfileType} from "../types/types";
import {ProfileFormPropsType} from "../components/profile/profileInfo/ProfileForm";

type PhotoData = {
    data: {
        photos: PhotosType
    }
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

export const profileApi = {

    getUser: function(userId: number|null) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(response => response.data)
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>('profile/status', {status: status})
            .then(response => response.data)
    },
    updateAvatar(file: File) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<PhotoData>(
            'profile/photo',
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(resp=>resp.data)
    },

    uploadProfile(formData: ProfileFormPropsType) {
        return instance.put<APIResponseType>('profile', formData)
            .then((data) => {
                if (data.data.resultCode !== ResultCodeEnum.success) return Promise.reject(data.data.messages[0])
            })
    }
}