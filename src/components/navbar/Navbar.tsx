import s from "./navbar.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {PropsType} from "./NavbarContainer";

type IsActiveFooTypeParamType = {
  isActive: boolean;
}

const isActive = ({isActive}:IsActiveFooTypeParamType):string => isActive ? s.active + ' ' + s.link : s.link;

const Navbar:React.FC<PropsType> = ({friends}:PropsType) => {
  const friendsElements = friends.map(f => {
    return (
      <li className={s.friendsItem} key={f.id}>
        <img src={f.avatar} alt="" className={s.ava}/>
        <div className={s.name}>{f.name}</div>
      </li>
    )
  })
  return (
    <nav className={s.nav}>
      <ul className={s.menu}>
        <li className={s.item}>
          <NavLink to="/profile" className={isActive}>
            Profile
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/users" className={isActive}>
            Users
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/dialogs" className={isActive}>
            Messages
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/news" className={isActive}>
            News
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/music" className={isActive}>
            Music
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/chat" className={isActive}>
            Chat
          </NavLink>
        </li>
      </ul>

      <div className={s.friendsBlock}>
        <h3 className={s.friendsHeader}>Friends</h3>
        <ul className={s.friends}>
          {friendsElements}
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;
