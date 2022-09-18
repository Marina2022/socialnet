import styles from './users.module.css'
import mockPhoto from '../../assets/1.jpg';
import React from 'react';
import {NavLink} from "react-router-dom";

const Users = (props) => {
  const {currentPage, totalPageCount, users, follow, unfollow, onPageClick} = props;
  let firstPage, lastPage, showRightPoints = true, showLeftPoints = true;
  if (currentPage < 5) {
    firstPage = 2;
    lastPage = 6;
    showLeftPoints = false;
  } else if (currentPage > totalPageCount - 5) {
    firstPage = totalPageCount - 6;
    lastPage = totalPageCount - 1;
    showRightPoints = false;
  } else {
    firstPage = currentPage - 2;
    lastPage = currentPage + 2;
  }

  const pageArray = [];
  for (let i = firstPage; i <= lastPage; i++) {
    pageArray.push(i);
  }

  return (

    <div>
      <div className={styles.pagination}>
        <span
          onClick={() => onPageClick(1)}
          className={currentPage === 1 ?
            styles.active + ' ' + styles.pagItem
            : styles.pagItem}>1</span>
        {showLeftPoints ? "..." : ''}

        {pageArray.map(p =>
          <span
            onClick={() => onPageClick(p)}
            className={p === currentPage ? styles.active + ' ' + styles.pagItem : styles.pagItem}
            key={p}
            >
            {p}
          </span>)
        }
        {showRightPoints ? "..." : ''}

        <span
          onClick={() => onPageClick(totalPageCount)}
          className={currentPage === totalPageCount
            ? styles.active + ' ' + styles.pagItem
            : styles.pagItem}>{totalPageCount}
        </span>

      </div>

      {users.map(u => <User
        user={u}
        follow={() => follow(u.id)}
        unfollow={() => unfollow(u.id)}
        key={u.id}
      />)
      }
    </div>
  )
}


const User = ({user, follow}) => {
  const {name, followed, photos, status, id} = user;
  return (
    <>
      <div className={styles.user}>
        <div className={styles.photoBlock}>
          <NavLink to={`/profile/${id}`}>{photos.small === null ? <img src={mockPhoto} alt=""/> : <img src={photos.small} alt=""/>}</NavLink>
        </div>
        <div className={styles.descBlock + ' ' + styles.df}>
          <div>
            <div className={styles.name}>{name}</div>
            <div>{status}</div>
          </div>
          <div>
            <div>
              {'location.city'}
            </div>
            <div>
              {'location.country'}
            </div>
          </div>
        </div>
      </div>
      <button className={styles.userBtn} onClick={follow}>{followed ? 'Follow' : 'Unfollow'}</button>
    </>
  )
}

export default Users;



