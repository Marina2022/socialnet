import styles from "./profileInfo.module.css";
import Preloader from "../../common/preloader";

const ProfileInfo = (props) => {
  if (!props.profile) return <Preloader/>
  const {aboutMe, fullName, photos: {large: largePhoto}} = props.profile
  return (
    <>
      <div className={styles.upperImg}>
        <img
          src="https://thumbs.dreamstime.com/b/%D1%88%D0%B8%D1%80%D0%BE%D0%BA%D0%B0%D1%8F-%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B8-%D0%B0%D1%81%D1%84%D0%B0%D0%BB%D1%8C%D1%82%D0%B0-%D0%B2-%D1%81%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B9-%D0%BC%D0%B5%D1%81%D1%82%D0%BD%D0%BE%D1%81%D1%82%D0%B8-%D0%BB%D0%B5%D1%82%D0%BD%D0%B8%D0%B9-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%BD%D0%B0-214241529.jpg"
          alt=""
        />
      </div>

      <div className={styles.userInfo}>
        <img
          src={largePhoto}
          alt=""
          className={styles.ava}
        />
        <div className={styles.description}>
          <h2 className={styles.fullName}>{fullName}</h2>
          <div>Date of Birth: 9 June</div>
          <div>City: Kirov</div>
          <div>About me: {aboutMe}</div>
          <div>WebSite: marsite.ru</div>
        </div>
      </div>
    </>
  )
}

export default  ProfileInfo;