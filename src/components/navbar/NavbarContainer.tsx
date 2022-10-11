// import StoreContext from '../../storeContext'
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {GlobalStateType} from "../../redux/redux-state";
import {FriendType} from "../../types/types";


type MapStateProps = {
    friends: Array<FriendType>
}
type DispatchProps = {
}
type OwnProps = {
}

export type PropsType = MapStateProps & DispatchProps & OwnProps

const mapStateToProps = (state: GlobalStateType)=> ({friends: state.navbarPage.friends})


const NavbarContainer = connect<MapStateProps, DispatchProps,  OwnProps, GlobalStateType>(mapStateToProps)(Navbar);

export default NavbarContainer;
