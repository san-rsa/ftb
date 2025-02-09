import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Match.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';



const Topic = ({head, id, link}) => {

    const newsLink =link?.replaceAll(' ','-')

    return (
       <Link to={"/news/" + newsLink}>

         <div className={Style.topics}>
            <h4> {head}  </h4>
        </div>

       </Link>

    )
}




const MatchTeam = ({logo, name, }) => {


    const link = name.replaceAll(' ','-')


    return (
           <Link to={"/team/" + link} className={Style.team}>

 
                    <div className={Style.logo} >
                        <img src={logo} />
                    </div>

                    
                        
                        <div className={Style.name}>
                            <h1 >  {name} </h1>
                        </div>

        


              </Link>
   

    )
}




const MatchCompetition = ({logo, name,}) => {

    const link = name.replaceAll(' ','-')

    return (

        <Link to={"/region/" + link} className={Style.competition}>


 
            <div className={Style.logo} >
                <img src={ logo} />
            </div>

            
            <div className={Style.name} >
            
                    <h2 > {name} </h2>

            </div>


          
        </Link>

    )
}



const MatchTime = ({day, time, }) => {

    return (
        <div className={Style.matchday}>


 
            <div className={Style.img3} >
                <h1 > {day} </h1>

            </div>

            
            <div className={Style.text3} >
                
                <div className={Style.head3}>
                    <h4 > {time} </h4>
                </div>

            </div>


            </div>
  

    )
}



const Mininews3 = ({img, head,link, id}) => {

    const newsLink =link?.replaceAll(' ','-')

    return (
        <div className={Style.newsm}>
            <Link to={ "/news/" + newsLink }>
            <div className={Style.news3}>


            
                <div className={Style.img3} >
                     <img src={img} />
                </div>

                
                <div className={Style.text3} >
                    
                    <div className={Style.head3}>
                        <h2 > {head} Premier League Player of the Week: The smiling assassin</h2>
                    </div>

                </div>


                </div>
            </Link>
        </div>

    )
}


export {Topic, MatchCompetition, MatchTeam, MatchTime, Mininews3}