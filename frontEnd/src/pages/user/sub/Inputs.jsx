import React, { useState } from "react";

import Style from "../../../styles/Login.module.css"

const Inputs = ( props) => {



    return (
        <div className={props.class} id={props.id}>
        <label >{props.label}</label>
        <input type={props.type} name={props.name} disabled={props.status} onChange={props.onchange} value={props.value} id={props.name} placeholder={"your " + props.name} required />
        </div>

    )
}



export default Inputs
