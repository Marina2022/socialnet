const forward = () => {
  window.history.forward();
}

const Music = () => {
  return (
    <div>
      Music
      <br/>
      <button onClick={forward}>
        forward
      </button>
    </div>
  )
}
export default Music;