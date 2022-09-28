import ProfileInfo from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";


const Profile = (props) =>
  {
    if(props.profile) return (
      <>
      <ProfileInfo {...props} />
      <MyPostsContainer/>
    </>)
    else return <>ddd</>

};
export default Profile;
