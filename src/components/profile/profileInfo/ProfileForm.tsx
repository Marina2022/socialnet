import styles from "./profileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {ProfilePropsType} from "../Profile";


export type ProfileFormPropsType = {
    fullName: string
    aboutMe: string
    checkbox: boolean
    lookingForAJobDescription: string
}

const ProfileForm: React.FC<InjectedFormProps<ProfileFormPropsType, ProfilePropsType> & ProfilePropsType> =
    ({
         error,
         handleSubmit,
         profile,
         me,
         updateStatus,
         status,
         startProfileEditMode


     }) => {
        let fullName
        if (profile) {
            fullName = profile.fullName
        } else fullName = '';
        return <>

            <form onSubmit={handleSubmit}>
                <div style={{color: "red"}}>{error}</div>
                <h2 className={styles.fullName}>{fullName}</h2>
                <Field component="input" name={"fullName"} placeholder={"full name"}/>
                <div><b>About me: </b>
                    <Field component="input" name={"aboutMe"} placeholder={"About me"}/>
                </div>
                <div><b>Looking for a job: </b>
                    <Field component="input" type="checkbox" name={"lookingForAJob"}/>
                </div>
                <div><b>My skills: </b>
                    <Field component="input" name={"lookingForAJobDescription"} placeholder={"My skills"}/>
                </div>
                <br/>
                <div><b>Contacts:</b></div>
                <br/>
                <div><b>Status:</b></div>
                <ProfileStatus me={me} updateStatus={updateStatus} status={status}/>
                <br/>
                <button className={styles.mt20} onClick={startProfileEditMode}>Submit</button>
            </form>
        </>
    }


export default reduxForm<ProfileFormPropsType, ProfilePropsType>({form: "profile"})(ProfileForm);