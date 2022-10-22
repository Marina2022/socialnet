import ProfileInfo from "./profileInfo/ProfileInfo";
import React from "react";
import MyPosts from "./myPosts/MyPosts";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../redux/redux-state";

type OwnProps = {
  me: boolean
}

const Profile: React.FC<OwnProps> = (props) => {
    const profile = useSelector((state: GlobalStateType) => state.profilePage.profile)
    if(profile) return (
      <>
      <ProfileInfo me={props.me} />
      <MyPosts/>
    </>)
    else return <></>

};
export default Profile;
