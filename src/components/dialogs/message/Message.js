import s from "./message.module.css"

const Message = (props) => {
  return (
    <div className={props.message.me ? s.left : s.right}>
      <div className={s.chatItem}>
        <div className={s.chatItemHeader}>
          <div className={s.name}>{props.message.name}</div>
          <small className="text-muted">{props.message.date}</small>
        </div>
        <p>{props.message.message}</p>
      </div>
    </div>
  )
}

export default Message