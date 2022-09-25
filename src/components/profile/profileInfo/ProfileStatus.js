import React  from 'react';

class ProfileStatus extends React.Component {
  state ={
    editMode: false,
    status: this.props.status
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps !== this.props) {
      this.setState({status: this.props.status})
    }
  }

  onStatusClick =() => {
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
          <div  onClick={this.onStatusClick}>{this.props.status}</div>
        }



      </div>

    )
  }
}


export default ProfileStatus;