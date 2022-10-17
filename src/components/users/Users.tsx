import React from 'react';
import Pagination from "./pagination";
import User from "./User";
import {FilterType, UserType} from "../../types/types";
import {UserSearchForm} from "./UserSearchForm";

type PropsType = {
  currentPage: number
  totalPageCount: number
  filter: FilterType
  users: Array<UserType>
  follow: (userId: number)=> void
  unfollow: (userId: number)=> void
  onPageClick: (page: number)=> void
  followingInProgress: Array<number>
  onFilterChange: (filter: FilterType) => void
}

const Users: React.FC<PropsType> = (props) => {
  const {
    currentPage,
    totalPageCount,
    users,
    follow,
    unfollow,
    onPageClick,
    followingInProgress,
    onFilterChange,
    filter
  } = props;

  return (
    <div>

      <Pagination currentPage={currentPage} totalPageCount={totalPageCount} onPageClick={onPageClick} />
      <UserSearchForm onFilterChange={onFilterChange} filter={filter}/>
      {users.map(u => <User
        user={u}
        follow={() => follow(u.id)}
        unfollow={() => unfollow(u.id)}
        followingInProgress={followingInProgress}
        key={u.id}
      />)
      }
      <Pagination currentPage={currentPage} totalPageCount={totalPageCount} onPageClick={onPageClick} />
    </div>
  )
}

export default Users;



