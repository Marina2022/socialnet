import React, {useEffect} from 'react';
import Pagination from "./pagination";
import User from "./User";
import {FilterType} from "../../types/types";
import {UserSearchForm} from "./UserSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageCount, getTotalPageCount,
  getUsers,
  getUsersFilter
} from "../../redux/users-selectors";
import {follow, requestUsers, unfollow, UserReducerACs} from "../../redux/users-reducer";
import {AppDispatch} from "../../redux/redux-state";


const {setCurrentPage, setFilter} = UserReducerACs;

const Users: React.FC = (props) => {
  const dispatch:AppDispatch = useDispatch();
  const filter = useSelector(getUsersFilter);
  const currentPage = useSelector(getCurrentPage);
  const pageCount = useSelector(getPageCount);


  const followingInProgress = useSelector(getFollowingInProgress);
  const users = useSelector(getUsers);
  const totalPageCount = useSelector(getTotalPageCount);
  const onPageClick = (page: number) => {
    if (page === currentPage) return;
    dispatch(setCurrentPage(page));
    dispatch(requestUsers(pageCount, page, filter));
  }

  const onFilterChange = (filter: FilterType) => {
    dispatch(setCurrentPage(1));
    setFilter(filter);
    dispatch(requestUsers(pageCount, 1, filter));
  }

  return (
    <div>

      <Pagination currentPage={currentPage} totalPageCount={totalPageCount} onPageClick={onPageClick} />
      <UserSearchForm onFilterChange={onFilterChange} filter={filter}/>
      {users.map(u => <User
        user={u}
        follow={() => dispatch(follow(u.id))}
        unfollow={() => dispatch(unfollow(u.id))}
        followingInProgress={followingInProgress}
        key={u.id}
      />)
      }
      <Pagination currentPage={currentPage} totalPageCount={totalPageCount} onPageClick={onPageClick} />

    </div>
  )
}

export default Users;



