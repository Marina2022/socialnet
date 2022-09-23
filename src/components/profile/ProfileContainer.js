
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUser, setProfile} from "../../redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";
import withAuth from "../HOCs/authHOC";


class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.userId;
    if (!userId) userId = 2;
    this.props.getUser(userId);
  }
  render() {
    if (this.props.isAuth ===false) return <Navigate to={'/login'}/>
  return <Profile {...this.props} />
  }
}

const mapStateToProps = (state) =>({
  profile: state.profilePage.profile,
  // isAuth: state.auth.isAuth
});

const withRouter = (Component) => {
  return (props)=> {
    const match = useParams();
    return <Component {...props} match={match}/>
  }
}

const WithRouterComponent = withRouter(withAuth(ProfileContainer))

export default connect (mapStateToProps, {setProfile, getUser})(WithRouterComponent);
