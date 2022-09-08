import MyPosts from "./myPosts/MyPosts";
import ProfileInfo from "./profileInfo/ProfileInfo";

const Profile = ({posts, addPost}) => (
  <>
    <ProfileInfo />
    <MyPosts posts={posts} addPost={addPost}/>
  </>
);
export default Profile;
