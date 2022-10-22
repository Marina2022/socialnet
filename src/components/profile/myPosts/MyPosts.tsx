import styles from "./myPosts.module.css";
import Post from "./post/Post";
import {reduxForm} from "redux-form";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, GlobalStateType} from "../../../redux/redux-state";
import {ProfileReducerACs} from "../../../redux/profile-reducer";
import {NewPostForm, PostFormPropsType} from "./NewPostForm";

const MyPosts: React.FC = () => {
    const posts = useSelector((state: GlobalStateType)=>state.profilePage.posts)
    const dispatch: AppDispatch = useDispatch();


  const postElements = posts.map(post=><Post message={post.message} likesCount={post.likesCount} key={post.id}/>)

  const onAddPost = (formData: any) => {
      dispatch(ProfileReducerACs.addPostActionCreator(formData.postText));
  }

  return (
    <div className={styles.myPosts}>
      <h2>My posts</h2>
      <div className={styles.newPost}>
        <h3>New post</h3>
        <ReduxNewPostForm onSubmit={onAddPost} />
      </div>
      <ul className={styles.postsList}>
        {postElements}
      </ul>
    </div>
  );
}

const ReduxNewPostForm = reduxForm<PostFormPropsType>({form: 'newPostForm'})(NewPostForm);


export default MyPosts;
