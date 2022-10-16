import ProfileInfo from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import React from "react";
import {WholeContainerProps} from "./ProfileContainer";

type OwnProps = {
  me: boolean
}

export type ProfilePropsType = WholeContainerProps & OwnProps

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
