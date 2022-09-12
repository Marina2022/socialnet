import ProfileInfo from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";


const Profile = ({store}) => (
  <>
    <ProfileInfo />
    <MyPostsContainer
      // posts={state.posts}
      // dispatch={dispatch}
      // newPostText={state.newPostText}
      store={store}
    />
  </>
);
export default Profile;
