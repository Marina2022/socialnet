import s from "./dialogItem.module.css"
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
  return (
    <div className={s.dialog}>
      <NavLink className={s.navLink} to={`/dialogs/${props.id}`} >
        <div className={s.contact}>
          <img src={props.avatar} alt="" className={s.profilePhoto} />
            <div className="msg-preview">
              <h6 className={s.name}>{props.name}</h6>
              <div className="replied"><i className="icon ion-reply"></i></div>
            </div>
        </div>
      </NavLink>
    </div>


)
}

export default DialogItem;