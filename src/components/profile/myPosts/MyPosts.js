import s from "./myPosts.module.css";
import Post from "./post/Post";

const MyPosts = ({postChange, addPost, newPostText, posts}) => {
  const postElements = posts.map(post=><Post message={post.message} likesCount={post.likesCount} key={post.id}/>)
  const onAddPost = () => {
    addPost();
  }
  const onPostChange = (e) => {
    const text = e.target.value;
    postChange(text);
  }

  return (
    <div className={s.myPosts}>
      <h2>My posts</h2>
      <div className={s.newPost}>
        <h3>New post</h3>
        <textarea onChange={onPostChange} value={newPostText}/>
        <div>
          <button onClick={onAddPost}>New</button>
        </div>
      </div>
      <ul className={s.postsList}>
        {postElements}
      </ul>
    </div>
  );
}
export default MyPosts;
