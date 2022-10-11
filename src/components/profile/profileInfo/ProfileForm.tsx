import styles from "./profileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {ProfilePropsType} from "../Profile";
//import {authorize} from "../../../redux/auth-reducer";

// type ProfileMapToProps = {
//     isAuth: boolean
// }
//
// type ProfileDispatchToProps = {
//     authorize: (formData: any) => void
// }

//type WholeFormProps = ProfilePropsType & ProfileMapToProps & ProfileDispatchToProps

type ProfileFormProps = {
    fullName: string
    aboutMe: string
    checkbox: boolean
    lookingForAJobDescription: string
}

const ProfileForm: React.FC<InjectedFormProps<ProfileFormProps, ProfilePropsType> & ProfilePropsType > =
    ({
         error,
         handleSubmit,
         profile,
         me,
         updateStatus,
         status,
         startProfileEditMode


    }) => {
    const {fullName} = profile
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


export default reduxForm<ProfileFormProps, ProfilePropsType>({form: "profile"})(ProfileForm);