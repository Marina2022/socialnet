import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const withAuth = (Component) => {

  const newComp = (props) => {
    if (!props.isAuth) return <Navigate to={'/login'}/>
    return <Component {...props} />
  }
  const mapStateToProps2 = (state) => ({
    isAuth: state.auth.isAuth
  })
  return connect (mapStateToProps2)(newComp);
}

export default withAuth;
