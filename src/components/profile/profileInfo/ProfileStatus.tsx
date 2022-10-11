import React, {useEffect, useState} from 'react';
import styles from './profileInfo.module.css'

type ProfileStatusProps = {
    status: string
    me: boolean
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<ProfileStatusProps> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status)


    useEffect(() => {
        setStatus(props.status)
    }, [props.status])


    const onStatusClick = () => {
        if (!props.me) return;
        setEditMode(true)
    }

    const onInputBlur = () => {
        props.updateStatus(status);
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
                value={status}
              ></input>
            }
            {!editMode &&
              <span className={styles.statusInput} onClick={onStatusClick}>{props.status}</span>
            }
        </div>
    )
}

export default ProfileStatus;