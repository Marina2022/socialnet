// Не удаляй, я его тестирую

import React, {Component} from 'react';
import styles from './profileInfo.module.css'

class ProfileStatus extends Component {
  state ={
    editMode: false,
    status: this.props.status
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps !== this.props) {
      this.setState({status: this.props.status})
    }
  }
  // const [editMode, setEditMode] = useState(false);
  // const [status, setStatus] = useState(props.status)


  // useEffect(()=>{
  //         setStatus(props.status)
  //     }, [props.status])
  //


  onStatusClick = () => {
    if (!this.props.me) return;
    this.setState({editMode: true})
  }

  onInputBlur = () => {
    this.props.updateStatus(this.state.status);
    this.setState({editMode: false})
  }

  onInputChange = (e) => {
    this.setState({status: e.target.value})
  }

  render() {
    return (
      <div>
        <br/>
        {this.state.editMode &&
          <input
            autoFocus={true}
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
            type="text"
            value={this.state.status}
          ></input>
        }
        {!this.state.editMode &&
          <span className={styles.statusInput} onClick={this.onStatusClick}>{this.props.status}</span>
        }
      </div>

    )

  }
}


export default ProfileStatus;