import React from "react";

import NavBar from "../../components/navBar/navBar";
import ListWorkers from "../../components/listWorkers/listWorkers";

function MainApp(props){
    return(
        <>
            <NavBar user = {props.user}/>
            <ListWorkers user = {props.user} dataDB = {props.dataDB}/>
        </>
    )
}

export default MainApp;