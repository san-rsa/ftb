import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Player.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';




const PlayerTeam = ({logo, name, link}) => {

    return (
        <Link to={"/team/" + link} >

        <div className={Style.team} >

        <div className={Style.logo}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={logo} />

        </div>
                

            
        <div className={Style.name}>

            <h5 > Team </h5>

            <h3 >  {name}  </h3>
        </div>    
        


        </div>



        </Link>
        

    )
}





const PlayerBio = ({answer, topic,}) => {

    return (
        <div className={Style.biostat} >

    
            <h1 > {answer} </h1>

            <h3 >  {topic}  </h3>
        


        </div>


        

    )
}



const TeamSquadList = ({img, name, link, number,}) => {

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






export {PlayerTeam, PlayerBio, TeamSquadList}