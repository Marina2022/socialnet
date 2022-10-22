import styles from "./profileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, GlobalStateType} from "../../../redux/redux-state";
import {startProfileEditMode} from "../../../redux/profile-reducer";


export type ProfileFormPropsType = {
    fullName: string
    aboutMe: string
    checkbox: boolean
    lookingForAJobDescription: string
}

type OwnProps = {
    me: boolean;
}

const ProfileForm: React.FC<InjectedFormProps<ProfileFormPropsType, OwnProps> & OwnProps> =
    ({
         error,
         handleSubmit,
         me,
     }) => {

        const dispatch: AppDispatch = useDispatch();
        const myStartProfileEditMode = ()=>{
            dispatch(startProfileEditMode)
        }

        const profile = useSelector((state: GlobalStateType)=>state.profilePage.profile)

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
                <ProfileStatus me={me}/>
                <br/>
                <button className={styles.mt20} onClick={myStartProfileEditMode}>Submit</button>
            </form>
        </>
    }


export default reduxForm<ProfileFormPropsType, OwnProps>({form: "profile"})(ProfileForm);