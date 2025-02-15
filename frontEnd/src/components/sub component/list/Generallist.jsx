import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/General.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';




const CardList = ({logo, name, category, to}) => {

    const link = name.replaceAll(' ','-')


    return (
        <Link to={"/" + to + "/" + link} className={Style.a} >

        <div className={Style.main} >

        <div className={Style.logo}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={logo} />

        </div>
                

            
        <div className={Style.name}>

            <h3 > {category} </h3>

            <h2 >  {name}  </h2>
        </div>    
        


        </div>



        </Link>
        

    )
}


const CardList2 = ({logo, name, category, to}) => {

    const link = name.replaceAll(' ','-')


    return (
        <Link to={"/" + to + "/" + link} className={Style.a2} >

        <div className={Style.main2} >

        <div className={Style.logo2}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={logo} />

        </div>
                

            
        <div className={Style.name2}>

            <h3 > {category} </h3>

            <h2 >  {name}  </h2>
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









export {CardList, PlayerBio, CardList2, }