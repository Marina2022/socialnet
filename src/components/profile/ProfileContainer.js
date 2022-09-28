
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUser, updateStatus} from "../../redux/profile-reducer";
import {Navigate, useParams} from "react-router-dom";
import withAuth from "../HOCs/authHOC";
import {compose} from "redux";
import {createBrowserHistory} from 'history';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.userId;
    if (!userId) userId = this.props.userId;
    if (!userId) {
      this.props.history.push('/login');
    return
  }
    this.props.getUser(userId);
    this.props.getStatus(userId);
  }

  render() {

    return (
      <Profile {...this.props} me={!this.props.match.userId} />
    )
  }
}

const mapStateToProps = (state) =>({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.auth.userId
});

const withRouter = (Component) => {
  return (props)=> {
    const match = useParams();
    const history = createBrowserHistory();
    return <Component {...props} match={match} history={history}/>
  }
}

//const WithRouterComponent = withRouter(withAuth(ProfileContainer))
//export default connect (mapStateToProps, {setProfile, getUser})(WithRouterComponent);


export default compose
(
  connect (mapStateToProps, {getUser, updateStatus, getStatus}),
  withRouter,
   // withAuth
  )
(ProfileContainer)
