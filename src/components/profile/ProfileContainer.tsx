import React from 'react';
import Profile, {ProfilePropsType} from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUser,
    startProfileEditMode,
    updateAvatar,
    updateStatus,
    uploadProfileData
} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {compose} from "redux";
import {createBrowserHistory} from 'history';
import {GlobalStateType} from "../../redux/redux-state";
import {ProfileType} from "../../types/types";


class ProfileContainer extends React.Component<MapStateType & MapDispatchType & ProfilePropsType> {
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

    componentDidUpdate(prevProps:ProfilePropsType, prevState: GlobalStateType) {
        if (this.props.match.userId !== prevProps.match.userId) {
            let userId = this.props.match.userId;
            if (!userId) userId = this.props.userId;
            if (!userId) {
                this.props.history.push('/login');
                return
            }
            this.props.getUser(userId);
            this.props.getStatus(userId);
        }
    }
    render() {
        return (
            <Profile {...this.props} me={!this.props.match.userId}/>
        )
    }
}

type MapStateType = {
    profile: ProfileType | null
    status: string | null
    userId: number | null
    isEditMode: boolean
}

type MapDispatchType = {
    getUser: (userId: number)=> void
    updateStatus: (status: string) => void
    getStatus: (userId: number) => void
    updateAvatar: (file: any) => void
    startProfileEditMode: () => void
    uploadProfileData: (formData: any) => void
}


const
    mapStateToProps = (state: GlobalStateType) => ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userId: state.auth.userId,
        isEditMode: state.profilePage.isEditMode,

    });

const
    withRouter = (Component: any) => {
        return (props: ProfilePropsType) => {
            const match = useParams();
            const history = createBrowserHistory();
            return <Component {...props} match={match} history={history}/>
        }
    }

//const WithRouterComponent = withRouter(withAuth(ProfileContainer))
//export default connect (mapStateToProps, {setProfile, getUser})(WithRouterComponent);


export default compose
(
    connect<MapStateType, MapDispatchType, ProfilePropsType, GlobalStateType>(
        mapStateToProps, {
            getUser, updateStatus, getStatus, updateAvatar, startProfileEditMode,
            uploadProfileData
        }
    ),
    withRouter,
)
(ProfileContainer)
