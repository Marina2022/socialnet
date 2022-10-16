import {ProfileReducerACs} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

import {connect} from "react-redux";
import {GlobalStateType} from "../../../redux/redux-state";

const mapStateToProps = (state: GlobalStateType) => {
  return {
    posts: state.profilePage.posts,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addPost: (text: string)=> {
      dispatch(ProfileReducerACs.addPostActionCreator(text))
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;
