import {
    follow,
     UserReducerACs,
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
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {FilterType, UserType} from "../../types/types";
import {GlobalStateType} from "../../redux/redux-state";


const {setCurrentPage, setFilter} = UserReducerACs;

type OwnPropsType = {
}

type MapStatePropsType = {
    users: Array<UserType>
    pageCount: number
    currentPage: number
    totalPageCount: number
    isFetching: boolean
    followingInProgress: Array<number>
    filter: FilterType
}

type DispatchToPropsType = {
    follow: (userId: number) => void
    setCurrentPage: (page: number) => void
    requestUsers: (pageCount: number, currentPage: number, filter: FilterType) => void
    unfollow: (userId: number) => void
    setFilter: (filter: FilterType)=> void
}


type PropsType = MapStatePropsType & DispatchToPropsType & OwnPropsType

class usersContainer extends React.Component<PropsType> {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.requestUsers(this.props.pageCount, this.props.currentPage, this.props.filter);
        }
    }

    onPageClick = (page: number) => {
        if (page === this.props.currentPage) return;
        this.props.setCurrentPage(page);
        this.props.requestUsers(this.props.pageCount, page, this.props.filter);  // thunk в редюсере
    }

    onFilterChange = (filter: FilterType) => {
        if (filter.term === "") return;
        this.props.setCurrentPage(1);
        this.props.setFilter(filter); // добавь в диспач
        this.props.requestUsers(this.props.pageCount, 1, filter);  // thunk в редюсере
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> :
                <Users onPageClick={this.onPageClick} onFilterChange={this.onFilterChange} {...this.props} />}
        </>
    }
}

const mapStateToProps = (state: GlobalStateType) => ({
    users: getUsers(state),
    pageCount: getPageCount(state),
    currentPage: getCurrentPage(state),
    totalPageCount: getTotalPageCount(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
});



const objForConnect = {
    follow, requestUsers, unfollow, setCurrentPage, setFilter
}

export default connect<MapStatePropsType, DispatchToPropsType, OwnPropsType, GlobalStateType>
(mapStateToProps, objForConnect)(usersContainer);
