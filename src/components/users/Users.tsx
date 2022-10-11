import React from 'react';
import Pagination from "./pagination";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
  currentPage: number
  totalPageCount: number
  users: Array<UserType>
  follow: (userId: number)=> void
  unfollow: (userId: number)=> void
  onPageClick: (page: number)=> void
  followingInProgress: Array<number>
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
  } = props;

  return (
    <div>
      <Pagination currentPage={currentPage} totalPageCount={totalPageCount} onPageClick={onPageClick} />
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



