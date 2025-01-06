import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Footer.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';



const SocialList = ({icon, name, handle, id, link}) => {

    const newsLink = link //.replaceAll(' ','-')

    return (
            <Link to={newsLink} className={Style.social}>                
                <div className={Style.social2}>

                    <FontAwesomeIcon icon={icon} />
                    <p> {name}</p>
                    <h5 > @{handle} </h5>
                </div>
            </Link>

    )
}




const Footerlist = ({list, head, id}) => {

    return (

        <div className={Style.col} >

            <h4 > {head} </h4>

            <ul > 
                {list.map((p) => (
           
                    <Link to={p.link}>
                    
                        <li > {p.list} </li>
                           
                    </Link>


                )   )   }

            </ul>

        </div>

    )
}




const Mininews2 = ({img, head, link, id}) => {

    const newsLink =link.replaceAll(' ','-')

    return (
        <div className={Style.newsm}>

        <Link to={"/news/" + newsLink}>
        <div className={Style.news3}>


 
            <div className={Style.img3} >
                <img src={ img} />
            </div>

            
            <div className={Style.text3} >
                
                <div className={Style.head3}>
                    <h2 > {head} Premier League Player of the Week: The smiling assassin</h2>
                </div>

            </div>


            </div>
        </Link>        </div>

    )
}







export {SocialList, Footerlist, Mininews2,}