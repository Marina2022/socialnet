import styles from "./profileInfo.module.css";
import Preloader from "../../common/preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({profile, me, updateStatus, status}) => {

  if (!profile) return <Preloader/>
  const {aboutMe, fullName, photos: {large: largePhoto}} = profile
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
        <div>
          <h2 className={styles.fullName}>{fullName}</h2>
          <div>About me: {aboutMe}</div>
          <ProfileStatus  me={me} updateStatus={updateStatus} status={status}/>
        </div>
      </div>
    </>
  )
}

export default  ProfileInfo;