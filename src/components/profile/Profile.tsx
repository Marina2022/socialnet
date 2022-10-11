import ProfileInfo from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";
import React from "react";

type DispatchPropsType = {
  getUser: (userId: number) => void
  updateStatus: (status: string) => void
  getStatus: (userId: number) => void
  updateAvatar: (file: any) => void
  startProfileEditMode: () => void
  uploadProfileData: (formData: any) => void
}

type MapToPropsType = {
  profile: ProfileType
  status: string
  userId: number
  isEditMode: boolean

}

type OwnProps = {
  match: any
  history: any
  me: boolean
}

export type ProfilePropsType  = MapToPropsType & DispatchPropsType & OwnProps

const Profile: React.FC<ProfilePropsType> = (props: ProfilePropsType) =>
  {
    if(props.profile) return (
      <>
      <ProfileInfo {...props} />
      <MyPostsContainer/>
    </>)
    else return <></>

};
export default Profile;
