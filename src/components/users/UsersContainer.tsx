import {useSelector} from "react-redux";
import Users from "./Users";
import React from "react";
import Preloader from "../common/preloader";
import {getIsFetching} from "../../redux/users-selectors";


export const UsersPage: React.FC = (props) => {
    const isFetching = useSelector(getIsFetching);

    return (<>
         {isFetching ? <Preloader/> :
             <Users />}
    </>)
}

