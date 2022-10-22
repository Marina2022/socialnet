import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, GlobalStateType} from "../../../redux/redux-state";
import styles from "./profileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import {ProfileReducerACs, startProfileEditMode} from "../../../redux/profile-reducer";

type PropsType = {
    me: boolean
}

export const ProfileData: React.FC<PropsType> = ({me}) => {

    const dispatch: AppDispatch = useDispatch();

    const myStartEditMod = () => {
        //dispatch(startProfileEditMode); // почему-то не работает санка
        if(!me) return;
        dispatch(ProfileReducerACs.setEditProfileMode(true))
    }
    const profile = useSelector((state: GlobalStateType) => state.profilePage.profile)

    if (!profile) return <></>;
    const {aboutMe, fullName, lookingForAJob, lookingForAJobDescription} = profile
    return <>
        <div>
            <h2 className={styles.fullName}>{fullName}</h2>
            <div><b>About me: </b>{aboutMe}</div>
            <div><b>Looking for a job: </b>{lookingForAJob ? "yes" : "no"}</div>
            <div><b>My skills: </b>{lookingForAJobDescription}</div>
            <br/>
            <div><b>Status: </b></div>
            <ProfileStatus me={me}/>
            <br/>
            <button className={styles.mt20} onClick={myStartEditMod}>Edit</button>
        </div>
    </>
}