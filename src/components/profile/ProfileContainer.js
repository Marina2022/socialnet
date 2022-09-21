
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfile} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import usersApi from "../../api/api";


class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.userId;
    if (!userId) userId = 2;
    usersApi.getUser(userId)
      .then(data => this.props.setProfile(data));
  }
  render() {
  return <Profile {...this.props} />
  }
}

const mapStateToProps = (state) =>({
  profile: state.profilePage.profile,
});

const withRouter = (Component) => {
  return (props)=> {
    const match = useParams();
    return <Component {...props} match={match}/>
  }
}

const WithRouterComponent = withRouter(ProfileContainer)

export default connect (mapStateToProps, {setProfile})(WithRouterComponent);
