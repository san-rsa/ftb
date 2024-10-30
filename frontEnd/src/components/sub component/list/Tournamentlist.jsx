import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Tournament.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';





const Tablehead = () => {


    return (
        <div className={Style.table}>
            <div className={Style.standings}>

                <h2> STANDING</h2>

                <ul >
                    <li className={Style.head}> 
                        <div className={Style.played} id={Style.played}>  <abbr > PL  </abbr> </div>
                        <div className={Style.win} id={Style.win}>  <abbr > W </abbr> </div>
                        <div className={Style.draw} id={Style.draw}>  <abbr > D </abbr> </div>
                        <div className={Style.loss} id={Style.loss}>  <abbr > L </abbr> </div>
                        <div className={Style.gd} id={Style.gd}>  <abbr > GD </abbr> </div>
                        <div className={Style.pts} id={Style.pts}>  <abbr > PTS </abbr> </div>

                    </li>

                </ul>





     </div>
        </div>

    )
}

const Table = ({pos, w, d, l, pts, name, logo, pl, gd}) => {


    return (
        <div className={Style.table}>
            <div className={Style.standings}>

                <ul >                 

                 <div className={Style.teams}> 
                    <li >  
                        <div className={Style.pos}> <span>1</span> </div>
                        <div className={Style.dot}> <div>  </div></div>

                        <div className={Style.team}>
                            <span > <img src="https://image-service.onefootball.com/transform?w=64&dpr=2&image=https://images.onefootball.com/icons/teams/164/2.png"/> </span>
                            <p> Arsenal</p>
                        </div>

                        <div className={Style.head2}>
                        <div className={Style.played} id={Style.played}>  <abbr > 2  </abbr> </div>
                        <div className={Style.win} id={Style.win}>  <abbr > 2 </abbr> </div>
                        <div className={Style.draw} id={Style.draw}>  <abbr > 2 </abbr> </div>
                        <div className={Style.loss} id={Style.loss}>  <abbr > 2 </abbr> </div>
                        <div className={Style.gd} id={Style.gd}>  <abbr > 2 </abbr> </div>
                        <div className={Style.pts} id={Style.pts}>  <abbr > 2 </abbr> </div>
                        </div>


                    </li>
                 </div>

                </ul>





     </div>
        </div>

    )
}







const Fixture = () => {


    return (
        <div className={Style.fixtures}>
            <div className={Style.matchday}>

                {/* <h2> Matchday 3</h2> */}

                <ul  className={Style.list}>
                
                    <li className={Style.fixture}>
                        <div className={Style.container} >
                            <span className={Style.teams}>

                                <span className={Style.home}>
                                    <span className={Style.name} > aaa</span>
                                    <span className={Style.logo}> <img src="https://image-service.onefootball.com/transform?w=64&dpr=2&image=https://images.onefootball.com/icons/teams/164/2.png"/>  </span>
                                </span>

                              <time dateTime="">  <span className={Style.date}> 18/8/2024  </span> <br/>  2:00 pm</time> 

                                <span className={Style.away}>
                                    <span className={Style.logo}> <img src="https://image-service.onefootball.com/transform?w=64&dpr=2&image=https://images.onefootball.com/icons/teams/164/2.png"/>  </span>
                                    <span className={Style.name} > aaa</span>
                                </span>
                            </span>
                        </div>
                    </li>


                </ul>





     </div>
        </div>

    )
}




const Result = ({h}) => {


    return (
        <div className={Style.results}>
            <div className={Style.matchday}>
{/* 
                <h2> Matchday 3</h2> */}

                <ul  className={Style.list}>
                
                    <li className={Style.result}>
                        <div className={Style.container} >
                            <span className={Style.teams}>

                                <span className={Style.home}>
                                    <span className={Style.name} > aaa</span>
                                    <span className={Style.logo}> <img src="https://image-service.onefootball.com/transform?w=64&dpr=2&image=https://images.onefootball.com/icons/teams/164/2.png"/>  </span>
                                </span>

                                <span className={Style.score}>
                                    <span className={Style.h}> 2 </span>
                                    <span className={Style.div}> - </span>
                                    <span className={Style.a}> 2 </span>
                                </span>
                                <span className={Style.away}>
                                    <span className={Style.logo}> <img src="https://image-service.onefootball.com/transform?w=64&dpr=2&image=https://images.onefootball.com/icons/teams/164/2.png"/>  </span>
                                    <span className={Style.name} > aaa</span>
                                </span>
                            </span>
                        </div>
                    </li>


                </ul>





     </div>
        </div>

    )
}
export {Table, Fixture, Result, Tablehead}