import styles from "./header.module.css";
import {NavLink} from "react-router-dom";
import {WholeHeaderProps} from "./HeaderContainer";
import React from "react";
import logo from '../../assets/logo.png'

const Header: React.FC<WholeHeaderProps> = (props) => {

  return (
    <header className={styles.header}>
      <img
        src={logo}
        alt=""
      />
      <div className={styles.login}>

        {props.isAuth ? <>

          <div> Hi, {props.login}</div>
            <button className={styles.logoutBtn} onClick={props.logout}>Log out</button>
        </>
          :  <NavLink to="/login">Login</NavLink>  }
      </div>

    </header>
  )
};
export default Header;
