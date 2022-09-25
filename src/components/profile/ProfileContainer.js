
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUser, setProfile, updateStatus} from "../../redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";
import withAuth from "../HOCs/authHOC";
import {compose} from "redux";


class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.userId;
    if (!userId) userId = 25962;
    this.props.getUser(userId);
    this.props.getStatus(userId);

  }

  render() {
    //if (this.props.isAuth ===false) return <Navigate to={'/login'}/>
  return <Profile {...this.props} me={!this.props.match.userId} />
  }
}

const mapStateToProps = (state) =>({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
});

const withRouter = (Component) => {
  return (props)=> {
    const match = useParams();
    return <Component {...props} match={match}/>
  }
}

//const WithRouterComponent = withRouter(withAuth(ProfileContainer))
//export default connect (mapStateToProps, {setProfile, getUser})(WithRouterComponent);


export default compose
(
  connect (mapStateToProps, {setProfile, getUser, updateStatus, getStatus}),
  withRouter,
  // withAuth
  )
(ProfileContainer)
