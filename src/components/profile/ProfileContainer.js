
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfile} from "../../redux/profile-reducer";
import * as axios from "axios";
import {useParams} from "react-router-dom";


class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.userId;
    if (!userId) userId = 2;
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      .then(response => {
        this.props.setProfile(response.data);
      });
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
