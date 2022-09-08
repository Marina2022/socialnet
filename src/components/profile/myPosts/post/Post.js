import s from "./post.module.css";

const Post = (props) => {
  //debugger;
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
