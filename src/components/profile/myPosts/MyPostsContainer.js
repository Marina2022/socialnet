import {addPostActionCreator, newPostChangeActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
// import StoreContext from "../../../storeContext";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postChange: (text) => {
      dispatch(newPostChangeActionCreator(text));
    },
    addPost: ()=> {
      dispatch(addPostActionCreator())
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;
