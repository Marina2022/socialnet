import s from "./myPosts.module.css";
import Post from "./post/Post";
import {createRef} from "react";

const MyPosts = ({posts, addPost:addPostFromIndex}) => {

  const postElements = posts.map(post=><Post message={post.message} likesCount={post.likesCount} key={post.id}/>)
  const addPost = () => {
    addPostFromIndex(postText.current.value)
  }
  const postText = createRef();

  return (
    <div className={s.myPosts}>
      <h2>My posts</h2>
      <div className={s.newPost}>
        <h3>New post</h3>
        <textarea ref={postText}></textarea>
        <div>
          <button onClick={addPost}>New</button>
        </div>
      </div>
      <ul className={s.postsList}>
        {postElements}
      </ul>
    </div>
  );
}
export default MyPosts;
