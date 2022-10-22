import React, {useEffect, useState} from 'react';
import styles from './profileInfo.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, GlobalStateType} from "../../../redux/redux-state";
import {updateStatus} from "../../../redux/profile-reducer";

type ProfileStatusProps = {
    me: boolean
}

const ProfileStatus: React.FC<ProfileStatusProps> = (props) => {
    const dispatch: AppDispatch = useDispatch();
    const globalStatus = useSelector((state: GlobalStateType)=>state.profilePage.status)

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(globalStatus)


    useEffect(() => {
        setStatus(globalStatus)
    }, [globalStatus])


    const onStatusClick = () => {
        if (!props.me) return;
        setEditMode(true)
    }


    const onInputBlur = () => {
        if (status) dispatch(updateStatus(status));
        setEditMode(false)
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    return (
        <div>
            {editMode &&
              <input
                autoFocus={true}
                onChange={onInputChange}
                onBlur={onInputBlur}
                type="text"
                value={status || ''}
              ></input>
            }
            {!editMode &&
              <span className={styles.statusInput} onClick={onStatusClick}>{globalStatus}</span>
            }
        </div>
    )
}

export default ProfileStatus;