import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Tournament.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';



const Table = () => {


    return (
        <div className={Style.table}>
            <div className={Style.standings}>

                <h2> STANDING</h2>

                <ul >
                    <li className={Style.head}> 
                        <div className={Style.played}>  <abbr > PL  </abbr> </div>
                        <div className={Style.win}>  <abbr > W </abbr> </div>
                        <div className={Style.draw}>  <abbr > D </abbr> </div>
                        <div className={Style.loss}>  <abbr > L </abbr> </div>
                        <div className={Style.gd}>  <abbr > GD </abbr> </div>
                        <div className={Style.pts}>  <abbr > PTS </abbr> </div>

                    </li>
                 

                 <div className={Style.teams}> 
                    <li >  
                        <div className={Style.pos}> <span>1</span> </div>
                        <div className={Style.dot}> <div>  </div></div>

                        <div className={Style.team}>
                            <span > <img src="https://image-service.onefootball.com/transform?w=64&dpr=2&image=https://images.onefootball.com/icons/teams/164/2.png"/> </span>
                            <p> Arsenal</p>
                        </div>

                        <div className={Style.head}>
                        <div className={Style.played}>  <abbr > PL  </abbr> </div>
                        <div className={Style.win}>  <abbr > W </abbr> </div>
                        <div className={Style.draw}>  <abbr > D </abbr> </div>
                        <div className={Style.loss}>  <abbr > L </abbr> </div>
                        <div className={Style.gd}>  <abbr > GD </abbr> </div>
                        <div className={Style.pts}>  <abbr > PTS </abbr> </div>
                        </div>


                    </li>
                 </div>

                </ul>





     </div>
        </div>

    )
}



export {Table}