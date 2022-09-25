import s from "./myPosts.module.css";
import Post from "./post/Post";
import {Field, reduxForm} from "redux-form";

const MyPosts = ({addPost, posts}) => {
  const postElements = posts.map(post=><Post message={post.message} likesCount={post.likesCount} key={post.id}/>)

  const onAddPost = ({postText}) => {
    addPost(postText);
  }


  return (
    <div className={s.myPosts}>
      <h2>My posts</h2>
      <div className={s.newPost}>
        <h3>New post</h3>
        <NewPostForm onSubmit={onAddPost} />
      </div>
      <ul className={s.postsList}>
        {postElements}
      </ul>
    </div>
  );
}

const Form = ({handleSubmit}) => {
  return <form onSubmit={handleSubmit}>
    <Field component="textarea" name="postText" />
    <div>
      <button>Add Post</button>
    </div>
  </form>
}

const NewPostForm = reduxForm({form: 'newPostForm'})(Form);


export default MyPosts;
