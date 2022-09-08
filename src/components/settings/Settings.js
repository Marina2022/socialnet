import Music from "../music/Music";

const back = () => {
  window.history.back();

}

const Settings = () => {

  return (
    <div>
      Settings
      <br/>
      <button onClick={back}>
        back
      </button>

    </div>
  )
}

export default Settings;