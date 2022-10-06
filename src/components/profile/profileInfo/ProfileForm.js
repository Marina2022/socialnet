import styles from "./profileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import {Field, reduxForm} from "redux-form";
import handleSubmit from "redux-form/lib/handleSubmit";

const ProfileForm = ({error, handleSubmit, profile, me, updateStatus, status, startProfileEditMode}) => {
  const {fullName} = profile
  return <>

    <form onSubmit={handleSubmit}>
      <div style={{color: "red"}}>{error}</div>
      <h2 className={styles.fullName}>{fullName}</h2>
      <Field component="input" name={"fullName"} placeholder={"full name"} />
      <div><b>About me: </b>
        <Field component="input" name={"aboutMe"} placeholder={"About me"} />
      </div>
      <div><b>Looking for a job: </b>
        <Field component="input" type="checkbox" name={"lookingForAJob"}  />
      </div>
      <div><b>My skills: </b>
        <Field component="input" name={"lookingForAJobDescription"} placeholder={"My skills"} />
      </div>
      <br/>
      <div><b>Contacts:</b></div>
      <br/>
      <div><b>Status:</b></div>
      <ProfileStatus me={me} updateStatus={updateStatus} status={status}/>
      <br/>
      {/*{Object.keys(contacts).map((key) => <div key={key} className={styles.pl15}><b>{key}:</b> {contacts[key]}</div>)}*/}

      <button className={styles.mt20} onClick={startProfileEditMode}>Submit</button>
    </form>
  </>
}


export default reduxForm({form: "profile"})(ProfileForm);