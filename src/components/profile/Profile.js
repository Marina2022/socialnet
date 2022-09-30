import ProfileInfo from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import Preloader from "../common/preloader";


const Profile = (props) =>
  {
    if(props.profile) return (
      <>
      <ProfileInfo {...props} />
      <MyPostsContainer/>
    </>)
    else return <></>

};
export default Profile;
