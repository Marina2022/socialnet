import s from "./myPosts.module.css";
import Post from "./post/Post";
import {createRef} from "react";

const MyPosts = ({posts, addPost:addPostFromIndex, newPostTextChange, newPostText, rerender}) => {

  const postText = createRef();

  const postElements = posts.map(post=><Post message={post.message} likesCount={post.likesCount} key={post.id}/>)
  const addPost = () => {
    addPostFromIndex(rerender);
  }

  const onPostChange = () => {
    //debugger;
    const text = postText.current.value;
    newPostTextChange(text, rerender);
  }

  return (
    <div className={s.myPosts}>
      <h2>My posts</h2>
      <div className={s.newPost}>
        <h3>New post</h3>
        <textarea ref={postText} onChange={onPostChange} value={newPostText}/>
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
