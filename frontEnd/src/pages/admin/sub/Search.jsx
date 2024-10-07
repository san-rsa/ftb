import React, { useState } from "react";

import Style from "../../../styles/Login.module.css"

const Search = ( props) => {



    return (
        <div className={props.class}>
        <label >{props.label}</label>
        <input type={props.type}  name={props.name} onChange={props.onchange} value={props.value} id={props.name} placeholder={"search here"} />
        </div>

    )
}



export default Search