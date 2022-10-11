import s from "./post.module.css";
import React from "react";

type PropsType = {
    message: string,
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <li className={s.item}>
      <img
        className={s.img}
        src="https://tvoiprogrammy.ru/wp-content/uploads/2017/09/Discord-logo.png"
        alt="av-1"
      />
      <span>{props.message}</span>
      <div>likes {props.likesCount}</div>
    </li>
  );
};
export default Post;
