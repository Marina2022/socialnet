import styles from "./profileInfo.module.css";
import Preloader from "../../common/preloader";
import mockPhoto from "../../../assets/1.jpg";
import ProfileForm, {ProfileFormPropsType} from "./ProfileForm";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, GlobalStateType} from "../../../redux/redux-state";
import {updateAvatar, uploadProfileData} from "../../../redux/profile-reducer";
import {ProfileData} from "./ProfileData";

type PropsType = {
  me: boolean
}
const ProfileInfo:React.FC<PropsType> = (props) => {

  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: GlobalStateType)=>state.profilePage.profile)
  const isEditMode = useSelector((state: GlobalStateType)=>state.profilePage.isEditMode)

  if (!profile) return <Preloader/>
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) dispatch(updateAvatar(e.target.files[0]));
  }

  const myOnSubmit = (formData: ProfileFormPropsType)=>{
    dispatch(uploadProfileData(formData))
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
            src={profile.photos ? profile.photos.large : mockPhoto}
            alt=""
            className={styles.ava}
          />
          {props.me && <div>
            <input type="file" onChange={onAvatarChange}/>
          </div>}
        </div>

        {!isEditMode ? <ProfileData me={props.me} /> :
            <ProfileForm
                initialValues={profile}
                onSubmit={myOnSubmit}
                me={props.me} />}
      </div>
    </div>
  )
}




export default ProfileInfo;