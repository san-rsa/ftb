import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Team.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';




const TeamList = ({logo, name,}) => {


    const link = name.replaceAll(' ','-')

    return (
        <Link to={"/team/" + link} className={Style.listT}>


        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={logo} />

        </div>
                

            
        <div className={Style.name}>
            <h4 >  {name}  </h4>
        </div>    
        

        </Link>
        

    )
}



const TeamSquadList = ({img, name, number,}) => {

    const link = name.replaceAll(' ','-')

    return (
        <Link to={"/player/" + link} className={Style.listS}>




        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={img} />

        </div>
                
            <div className={Style.number} >
                <h1 > {number} 2 </h1>
            </div>
            
        <div className={Style.name}>
            <h3 >  {name}  </h3>
        </div>    
        


        </Link>
        

    )
}






export {TeamList, TeamSquadList}