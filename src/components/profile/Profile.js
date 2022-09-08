import MyPosts from "./myPosts/MyPosts";
import ProfileInfo from "./profileInfo/ProfileInfo";

const Profile = ({posts, addPost, newPostTextChange, newPostText}) => (
  <>
    <ProfileInfo />
    <MyPosts posts={posts} addPost={addPost} newPostTextChange={newPostTextChange} newPostText={newPostText}/>
  </>
);
export default Profile;
