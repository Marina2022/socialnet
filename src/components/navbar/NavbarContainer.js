// import StoreContext from '../../storeContext'
import Navbar from "./Navbar";
import {connect} from "react-redux";

// const NavbarContainer = () => {
//    return (
//     <StoreContext.Consumer>
//       {
//         (store) => {
//           const friends = store.getState().navbarPage.friends;
//           return (
//             <Navbar friends={friends}/>
//           )
//         }
//       }
//     </StoreContext.Consumer>
//
//   )
// };

const mapStateToProps = (state)=> ({friends: state.navbarPage.friends})

const NavbarContainer = connect(mapStateToProps)(Navbar);


export default NavbarContainer;
