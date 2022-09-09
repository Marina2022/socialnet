import MyPosts from "./myPosts/MyPosts";
import ProfileInfo from "./profileInfo/ProfileInfo";

const Profile = ({state, store }) => (
  <>
    <ProfileInfo />
    <MyPosts
      posts={state.posts}
      store={store}
      newPostText={state.newPostText}
    />
  </>
);
export default Profile;
