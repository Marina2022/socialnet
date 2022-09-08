import MyPosts from "./myPosts/MyPosts";
import ProfileInfo from "./profileInfo/ProfileInfo";

const Profile = ({posts, addPost, newPostTextChange, newPostText, rerender}) => (
  <>
    <ProfileInfo />
    <MyPosts
      posts={posts}
      addPost={addPost}
      newPostTextChange={newPostTextChange}
      newPostText={newPostText}
      rerender={rerender}
    />
  </>
);
export default Profile;
