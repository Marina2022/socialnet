import Post from "./post/Post";
import {addPostActionCreator, newPostChangeActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = ({store}) => {
  // const postElements = posts.map(post=><Post message={post.message} likesCount={post.likesCount} key={post.id}/>)

  const addPost = () => {
    store.dispatch(addPostActionCreator());
  }
  const postChange = (text) => {
    store.dispatch(newPostChangeActionCreator(text))
  }
  return (
    <MyPosts
      postChange={postChange}
      addPost={addPost}
      newPostText={store.getState().profilePage.newPostText}
      posts={store.getState().profilePage.posts}
    />

  );
}
export default MyPostsContainer;
