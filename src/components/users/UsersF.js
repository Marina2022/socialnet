import styles from './users.module.css'
import * as axios from 'axios';
import mockPhoto from '../../assets/1.jpg';

// const newUsers = [
//   {
//     id: 1,
//     fullName: 'Mara',
//     followed: true,
//     photoUrl: 'https://ruskemping.ru/wp-content/uploads/2021/11/avatar_4140.gif',
//     location: {city: 'Kirov', country: 'Russia'},
//     status: 'everything fucking good!',
//   }, {
//     id: 2,
//     fullName: 'Jane',
//     followed: false,
//     photoUrl: 'https://www.youloveit.ru/uploads/posts/2014-11/1415459893_youloveit_ru_avatarki_vocaloidy02.png',
//     location: {city: 'Varshava', country: 'Poland'},
//     status: 'looking for a job!',
//   }, {
//     id: 3,
//     fullName: 'Mike',
//     followed: true,
//     photoUrl: 'https://avotar.ru/avatar/krutye/100/38.jpg',
//     location: {city: 'Tbilisi', country: 'Georgia'},
//     status: 'wanna big big money',
//   }, {
//     id: 4,
//     fullName: 'Josh',
//     followed: true,
//     photoUrl: 'https://avatarko.ru/img/avatar/12/suslik_11920.jpg',
//     location: {city: 'Nairobi', country: 'Kenia'},
//     status: 'hello from Kenia',
//   },
// ]

const Users = ({users, follow, unfollow, setUsers}) => {
  if (users.length === 0) {

    axios.get('https://social-network.samuraijs.com/api/1.0/users')
      .then(response=>setUsers(response.data.items));
  }
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

const User = ({user, follow}) => {
  console.log(user)
  const {name, followed, photos, status} = user;
  return (
    <>
      <div className={styles.user}>
        <div className={styles.photoBlock}>
          {photos.small === null ? <img src={mockPhoto} alt=""/> : <img src={photos.small} alt=""/> }


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



