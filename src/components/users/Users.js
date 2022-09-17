import styles from './users.module.css'
import * as axios from 'axios';
import mockPhoto from '../../assets/1.jpg';
import React from 'react';

class Users extends React.Component{
  componentDidMount() {
    if (this.props.users.length === 0) {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageCount}&page=${this.props.currentPage}`)
        .then(response => {
          this.props.setUsers(response.data.items);
          this.props.setTotalPageCount(Math.ceil(response.data.totalCount / this.props.pageCount));
        });
    }
  }

  onPageClick = (page)=> {
    this.props.setCurrentPage(page);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageCount}&page=${page}`)
  .then(response => {
      this.props.setUsers(response.data.items);
    });
  }


  render = () => {
    const {currentPage, totalPageCount, users, follow, unfollow} = this.props;
    let firstPage, lastPage, showRightPoints = true, showLeftPoints  = true;
    if (currentPage < 5) {
      firstPage = 2;
      lastPage = 6;
      showLeftPoints = false;
    } else {
      firstPage = currentPage - 2;
      lastPage = currentPage + 2;
    }
    if (currentPage > totalPageCount-5) {
      firstPage = currentPage - 6;
      lastPage = currentPage-1;
      showRightPoints = false;
    }

    const pageArray = [];
    for (let i = firstPage; i <= lastPage; i++) {
      pageArray.push(i);
    }

    return <div>
      <div className={styles.pagination}>

        <span className={currentPage === 1 ? styles.active + ' ' + styles.pagItem : styles.pagItem} >1</span>{showLeftPoints? "..." : ''}


        {pageArray.map(p=>
          <span onClick={()=> this.onPageClick(p)} className={p===currentPage ? styles.active + ' ' + styles.pagItem : styles.pagItem} key={p} >{p}</span>)
        }


        {showRightPoints? "..." : ''}<span className={currentPage === totalPageCount ? styles.active + ' ' + styles.pagItem : styles.pagItem}>{totalPageCount}</span>
      </div>
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



