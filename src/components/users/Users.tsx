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
  const filter = useSelector(getUsersFilter);

  useEffect(() => {
    if (users.length === 0) {
      // @ts-ignore
      dispatch(requestUsers(pageCount, currentPage, filter));
    }
  }, [])

  const dispatch:AppDispatch = useDispatch();

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
    setCurrentPage(1);
    setFilter(filter); // добавь в диспач
    dispatch(requestUsers(pageCount, 1, filter));
  }

  const currentPage = useSelector(getCurrentPage);

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
      sss
    </div>
  )
}

export default Users;



