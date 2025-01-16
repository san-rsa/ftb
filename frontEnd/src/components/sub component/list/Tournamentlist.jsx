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

                <ul >
                    <li className={Style.head}> 
                        <div className={Style.played} id={Style.played}>  <abbr > PL  </abbr> </div>
                        <div className={Style.win} id={Style.win}>  <abbr > W </abbr> </div>
                        <div className={Style.draw} id={Style.draw}>  <abbr > D </abbr> </div>
                        <div className={Style.loss} id={Style.loss}>  <abbr > L </abbr> </div>
                        <div className={Style.gd} id={Style.gd}>  <abbr > GD </abbr> </div>
                        <div className={Style.gs} id={Style.gs}>  <abbr > GS </abbr> </div>
                        <div className={Style.ga} id={Style.ga}>  <abbr > GA </abbr> </div>

                        <div className={Style.pts} id={Style.pts}>  <abbr > PTS </abbr> </div>

                    </li>

                </ul>





     </div>
        </div>

    )
}

const Table = ({pos, w, d, l, pts, name, logo, pl, gd, ga, gs}) => {


    return (
        <div className={Style.table}>
            <div className={Style.standings}>

                           

                 <div className={Style.teams}> 
                    <li >  
                        <div className={Style.info} >
                            <div className={Style.pos}> <span>{pos}</span> </div>
                            <div className={Style.dot}> <div>  </div></div>

                            <div className={Style.team}>
                                <span > <img src={logo}/> </span>
                                <p> {name}</p>
                            </div>

                        </div>

                        <div className={Style.head2}>
                        <div className={Style.played} id={Style.played}>  <abbr > {pl}  </abbr> </div>
                        <div className={Style.win} id={Style.win}>  <abbr > {w} </abbr> </div>
                        <div className={Style.draw} id={Style.draw}>  <abbr > {d} </abbr> </div>
                        <div className={Style.loss} id={Style.loss}>  <abbr > {l} </abbr> </div>
                        <div className={Style.gd} id={Style.gd}>  <abbr > {gd} </abbr> </div>
                        <div className={Style.gs} id={Style.gs}>  <abbr > {gs} </abbr> </div>
                        <div className={Style.ga} id={Style.ga}>  <abbr > {ga} </abbr> </div>

                        <div className={Style.pts} id={Style.pts}>  <abbr > {pts} </abbr> </div>
                        </div>


                    </li>
                 </div>

          





     </div>
        </div>

    )
}







const Fixture = ({Hname, Hlogo, date, time, Alogo, Aname}) => {


    return (
        <div className={Style.fixtures}>
            <div className={Style.matchday}>

                {/* <h2> Matchday 3</h2> */}

                <ul  className={Style.list}>
                
                    <li className={Style.fixture}>
                        <div className={Style.container} >
                            <span className={Style.teams}>

                                <span className={Style.home}>
                                    <span className={Style.name} > {Hname}</span>
                                    <span className={Style.logo}> <img src={Hlogo} />  </span>
                                </span>

                              <time dateTime="">  <span className={Style.date}> {date}  </span> <br/> {time}</time> 

                                <span className={Style.away}>
                                    <span className={Style.logo}> <img src={Alogo} />  </span>
                                    <span className={Style.name} > {Aname}</span>
                                </span>
                            </span>
                        </div>
                    </li>


                </ul>





     </div>
        </div>

    )
}




const Result = ({Hname, Hlogo, Hscore, Ascore, Alogo, Aname}) => {


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
                                    <span className={Style.name} > {Hname}</span>
                                    <span className={Style.logo}> <img src={Hlogo}  />  </span>
                                </span>

                                <span className={Style.score}>
                                    <span className={Style.h}> {Hscore} </span>
                                    <span className={Style.div}> - </span>
                                    <span className={Style.a}> {Ascore} </span>
                                </span>
                                <span className={Style.away}>
                                    <span className={Style.logo}> <img src={Alogo}  />  </span>
                                    <span className={Style.name} > {Aname}</span>
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