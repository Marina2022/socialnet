import styles from './users.module.css'
import * as axios from 'axios';
import mockPhoto from '../../assets/1.jpg';
import React from 'react';

class Users extends React.Component{
  constructor(props) {
    super(props);
    if (this.props.users.length === 0) {

      axios.get('https://social-network.samuraijs.com/api/1.0/users')
        .then(response => this.props.setUsers(response.data.items));
    }
  }

  render = () => {
    const {users, follow, unfollow} = this.props;

    return <div>
      {users.map(u => <User
        user={u}
        follow={() => follow(u.id)}
        unfollow={() => unfollow(u.id)}
        key={u.id}
      />)
      }
    </div>
  }
}

const User = ({user, follow}) => {
  console.log(user)
  const {name, followed, photos, status} = user;
  return (
    <>
      <div className={styles.user}>
        <div className={styles.photoBlock}>
          {photos.small === null ? <img src={mockPhoto} alt=""/> : <img src={photos.small} alt=""/>}
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



