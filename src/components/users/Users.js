import React from 'react';
import Pagination from "./paination";
import User from "./User";

const Users = (props) => {
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
    </div>
  )
}

export default Users;



