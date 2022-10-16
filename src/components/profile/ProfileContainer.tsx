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


type OwnPropsType = {
    match: any,
    history: any
}

export type WholeContainerProps = MapStateType & MapDispatchType & OwnPropsType;

class ProfileContainer extends React.Component<WholeContainerProps> {
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

    componentDidUpdate(prevProps: ProfilePropsType, prevState: GlobalStateType) {
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

const
    mapStateToProps = (state: GlobalStateType) => ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userId: state.auth.userId,
        isEditMode: state.profilePage.isEditMode,

    });
type MapStateType = ReturnType<typeof mapStateToProps>

type MapDispatchType = {
    getUser: (userId: number) => void
    updateStatus: (status: string) => void
    getStatus: (userId: number) => void
    updateAvatar: (file: any) => void
    startProfileEditMode: () => void
    uploadProfileData: (formData: any) => void
}

function withRouter<propsType> (Component: React.ComponentType<propsType>) {
        return (props: propsType) => {
            const match = useParams();
            const history = createBrowserHistory();
            return <Component {...props} match={match} history={history}/>
        }
    }

export default compose<React.ComponentType>
(
    connect<MapStateType, MapDispatchType, OwnPropsType, GlobalStateType>(
        mapStateToProps, {
            getUser, updateStatus, getStatus, updateAvatar, startProfileEditMode,
            uploadProfileData
        }
    ),
    withRouter,
)
(ProfileContainer)

