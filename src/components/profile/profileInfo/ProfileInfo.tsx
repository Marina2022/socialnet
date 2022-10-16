import styles from "./profileInfo.module.css";
import Preloader from "../../common/preloader";
import ProfileStatus from "./ProfileStatus";
import mockPhoto from "../../../assets/1.jpg";
import ProfileForm from "./ProfileForm";
import {ProfilePropsType} from "../Profile";
import React from "react";


const ProfileInfo:React.FC<ProfilePropsType> = (props: ProfilePropsType) => {
  if (!props.profile) return <Preloader/>
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) props.updateAvatar(e.target.files[0]);
  }
    return (
    <div>
      <div className={styles.upperImg}>
        <img
          src="https://thumbs.dreamstime.com/b/%D1%88%D0%B8%D1%80%D0%BE%D0%BA%D0%B0%D1%8F-%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B8-%D0%B0%D1%81%D1%84%D0%B0%D0%BB%D1%8C%D1%82%D0%B0-%D0%B2-%D1%81%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B9-%D0%BC%D0%B5%D1%81%D1%82%D0%BD%D0%BE%D1%81%D1%82%D0%B8-%D0%BB%D0%B5%D1%82%D0%BD%D0%B8%D0%B9-%D0%B4%D0%B5%D0%BD%D1%8C-%D0%BD%D0%B0-214241529.jpg"
          alt=""
        />
      </div>
      <div className={styles.userInfo}>
        <div>
          <img
            src={props.profile.photos ? props.profile.photos.large : mockPhoto}
            alt=""
            className={styles.ava}
          />
          {props.me && <div>
            <input type="file" onChange={onAvatarChange}/>
          </div>}
        </div>

        {!props.isEditMode ? <ProfileData {...props} /> :
            <ProfileForm
                initialValues={props.profile}
                onSubmit={props.uploadProfileData}{...props} />}
      </div>
    </div>
  )
}

const ProfileData:React.FC<ProfilePropsType> = ({profile, me, updateStatus, status, startProfileEditMode}:ProfilePropsType) => {
  if (!profile) return <></>;
  const {aboutMe, fullName, lookingForAJob, lookingForAJobDescription} = profile
  return <>
    <div >
      <h2 className={styles.fullName}>{fullName}</h2>
      <div><b>About me: </b>{aboutMe}</div>
      <div><b>Looking for a job: </b>{lookingForAJob ? "yes" : "no"}</div>
      <div><b>My skills: </b>{lookingForAJobDescription}</div>
      <br/>
      <div><b>Status: </b></div>
      <ProfileStatus me={me} updateStatus={updateStatus} status={status}/>
      <br/>
      <button className={styles.mt20} onClick={startProfileEditMode}>Edit</button>
    </div>
  </>
}


export default ProfileInfo;