import ProfileInfo from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";


const Profile = (props) => (
  <>
    <ProfileInfo {...props} />
    <MyPostsContainer/>
  </>
);
export default Profile;
