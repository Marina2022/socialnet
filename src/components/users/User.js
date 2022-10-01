import styles from "./users.module.css";
import {NavLink} from "react-router-dom";
import mockPhoto from "../../assets/1.jpg";
import React from "react";

const User = ({user, follow, unfollow, followingInProgress}) => {
  const {name, followed, photos, status, id} = user;
  return (
    <>
      <div className={styles.user}>
        <div className={styles.photoBlock}>
          <NavLink to={`/profile/${id}`}>{photos.small === null ? <img src={mockPhoto} alt=""/> :
            <img src={photos.small} alt=""/>}</NavLink>
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

      <button disabled={followingInProgress.some(followId => followId === id)} className={styles.userBtn}
              onClick={followed ? unfollow : follow}>{followed ? 'Unfollow' : 'Follow'}</button>
    </>
  )
}

export default User;