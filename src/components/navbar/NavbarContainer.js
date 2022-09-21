// import StoreContext from '../../storeContext'
import Navbar from "./Navbar";
import {connect} from "react-redux";

const mapStateToProps = (state)=> ({friends: state.navbarPage.friends})

const NavbarContainer = connect(mapStateToProps)(Navbar);


export default NavbarContainer;
