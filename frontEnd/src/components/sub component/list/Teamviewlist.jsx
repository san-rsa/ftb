import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Team.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';




const TeamList = ({logo, name, link}) => {

    return (
        <Link to={"/team/" + link} >

        <div className={Style.listT} >

        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={logo} />

        </div>
                

            
        <div className={Style.name}>
            <h4 >  {name}  </h4>
        </div>    
        


        </div>

        </Link>
        

    )
}





export {TeamList, }