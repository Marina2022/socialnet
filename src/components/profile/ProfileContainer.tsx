import React, {useEffect} from 'react';
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {getStatus, getUser, ProfileReducerACs} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {compose} from "redux";
import {createBrowserHistory} from 'history';
import {AppDispatch, GlobalStateType} from "../../redux/redux-state";
import Preloader from "../common/preloader";


type OwnPropsType = {
    match: any,
    history: any
}

const ProfileContainer: React.FC<OwnPropsType> = (props) => {
    const myUserId = useSelector((state: GlobalStateType)=>state.auth.userId)
    const dispatch:AppDispatch = useDispatch();
    const isFetching = useSelector((state: GlobalStateType)=>state.profilePage.isFetching)
    useEffect(() => {
        let userId = props.match.userId;
        if (!userId) userId = myUserId;
        if (!userId) {
            props.history.push('/login');
            return
        }
        dispatch(ProfileReducerACs.isFetching(true))
        dispatch(getUser(userId));
        dispatch(getStatus(userId));
    }, [])


    useEffect(()=>{
        let userId = props.match.userId;
        if (!userId) userId = myUserId;
        if (!userId) {
            props.history.push('/login');
            return
        }
        dispatch(getUser(userId));
        dispatch(getStatus(userId));
    }, [props.match.userId])

    return (
        isFetching ? <Preloader/> :
        <Profile me={!props.match.userId}/>
    )
}

function withRouter<propsType>(Component: React.ComponentType<propsType>) {
    return (props: propsType) => {
        const match = useParams();
        const history = createBrowserHistory();
        return <Component {...props} match={match} history={history}/>
    }
}

export default compose<React.ComponentType>(withRouter)(ProfileContainer)

