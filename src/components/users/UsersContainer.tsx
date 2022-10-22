import {useDispatch, useSelector} from "react-redux";
import Users from "./Users";
import React, {useEffect} from "react";
import Preloader from "../common/preloader";
import {getCurrentPage, getIsFetching, getPageCount, getUsers, getUsersFilter} from "../../redux/users-selectors";
import {requestUsers, UserReducerACs} from "../../redux/users-reducer";
import {AppDispatch} from "../../redux/redux-state";
import {useLocation, useNavigate} from "react-router-dom";


export const UsersPage: React.FC = (props) => {
    const dispatch: AppDispatch = useDispatch();
    const currentPage = useSelector(getCurrentPage);
    const pageCount = useSelector(getPageCount);
    const users = useSelector(getUsers);
    const filter = useSelector(getUsersFilter);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const paramObj = new URLSearchParams(location.search);
        let actualFilter = {...filter}
        let innerCurrentPage = currentPage;

        const actualTerm = paramObj.get('term')
        if (actualTerm) actualFilter.term = actualTerm;
        const actualFriend = paramObj.get('friend');
        if (actualFriend) actualFilter.friend = actualFriend === "null" ? null : actualFriend === "true"
        let actualPage = paramObj.get('page');

        if (actualPage) {
            innerCurrentPage = +actualPage
        }
        if (users.length === 0) {
            dispatch(UserReducerACs.setCurrentPage(innerCurrentPage));
            dispatch(UserReducerACs.setFilter(actualFilter));
            dispatch(requestUsers(pageCount, innerCurrentPage, actualFilter));
        }
    }, [])

    useEffect(() => {
        navigate(`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`);
    }, [filter.term, filter.friend, currentPage])

    const isFetching = useSelector(getIsFetching);
    return (<>
        {isFetching ? <Preloader/> :
            <Users/>}
    </>)
}

