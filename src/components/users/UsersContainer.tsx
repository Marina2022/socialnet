import {
    follow,
    setCurrentPage,
    requestUsers, unfollow
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import React from "react";
import Preloader from "../common/preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageCount,
    getTotalPageCount,
    getUsers
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {GlobalStateType} from "../../redux/redux-state";

type OwnPropsType = {
}

type MapStatePropsType = {
    users: Array<UserType>
    pageCount: number
    currentPage: number
    totalPageCount: number
    isFetching: boolean
    followingInProgress: Array<number>
}

type DispatchToPropsType = {
    follow: (userId: number) => void
    setCurrentPage: (page: number) => void
    requestUsers: (pageCount: number, currentPage: number) => void
    unfollow: (userId: number) => void
}


type PropsType = MapStatePropsType & DispatchToPropsType & OwnPropsType

class usersContainer extends React.Component<PropsType> {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.requestUsers(this.props.pageCount, this.props.currentPage);
        }
    }

    onPageClick = (page: number) => {
        if (page === this.props.currentPage) return;
        this.props.setCurrentPage(page);
        this.props.requestUsers(this.props.pageCount, page);  // thunk в редюсере
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : <Users onPageClick={this.onPageClick} {...this.props} />}
        </>
    }
}



const mapStateToProps = (state: GlobalStateType) => ({
    users: getUsers(state),
    pageCount: getPageCount(state),
    currentPage: getCurrentPage(state),
    totalPageCount: getTotalPageCount(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
});



const objForConnect = {
    follow, requestUsers, unfollow, setCurrentPage
}

export default connect<MapStatePropsType, DispatchToPropsType, OwnPropsType, GlobalStateType>
(mapStateToProps, objForConnect)(usersContainer);
