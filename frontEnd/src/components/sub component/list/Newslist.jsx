import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import List  from "./List";
import Style from "../../../styles/News.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';

var i ="https://image-service.onefootball.com/transform?w=620&h=348&dpr=2&image=https%3A%2F%2Fwp-images.onefootball.com%2Fwp-content%2Fuploads%2Fsites%2F10%2F2024%2F10%2FFBL-ENG-PR-ARSENAL-SOUTHAMPTON-1728373020-1000x750.jpg"



const News = ({img, head, body, id}) => {


    return (
        <div className={Style.news}>
            <Link to={"/product/gg"}>
            <div className={Style.news1}>

                <div className={Style.img1} >
                    <img src={  img +i } />
                </div>

                
                <div className={Style.text1} >
                    
                    <div className={Style.head1}>
                        <h2 >  {head} Premier League Player of the Week: The smiling assassin</h2>
                    </div>

                    
                    <div className={Style.body1} >
                        <p >  {body} bFrom fights at the Bridge to crumblings by the coast, it was a fascinating weekend of action in the Premier League. But our Player of the Week is … Bukayo Saka (Arsenal) In...bb</p>
                    </div>
                </div>


                </div>
            </Link>
        </div>

    )
}




const Mininews = ({img, head, id}) => {


    return (
        <div className={Style.newsm}>
           <Link >
            <div className={Style.news2}>


 
                    <div className={Style.img2} >
                        <img src={i + img} />
                    </div>

                    
                    <div className={Style.text2} >
                        
                        <div className={Style.head2}>
                            <h2 >  {head} Premier League Player of the Week: The smiling assassin</h2>
                        </div>

                    </div>


                </div>
              </Link>
        </div>

    )
}




const Mininews2 = ({img, head, id}) => {


    return (
        <div className={Style.newsm}>

        <Link >
        <div className={Style.news3}>


 
            <div className={Style.img3} >
                <img src={i + img} />
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



const Minivideo = ({img, head, body}) => {


    return (
        <div className={Style.newsm}>
            <Link >
            <div className={Style.news3}>


 
            <div className={Style.img3} >
                <img src="https://image-service.onefootball.com/transform?w=620&h=348&dpr=2&image=https%3A%2F%2Fwp-images.onefootball.com%2Fwp-content%2Fuploads%2Fsites%2F10%2F2024%2F10%2FFBL-ENG-PR-ARSENAL-SOUTHAMPTON-1728373020-1000x750.jpg"/>
            </div>

            
            <div className={Style.text3} >
                
                <div className={Style.head3}>
                    <h2 > {head}  Premier League Player of the Week: The smiling assassin</h2>
                </div>

            </div>


            </div>
            </Link>
        </div>

    )
}



const Mininews3 = ({img, head, id}) => {


    return (
        <div className={Style.newsm}>
            <Link >
            <div className={Style.news3}>


            
                <div className={Style.img3} >
                     <img src={i + img} />
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


export default News
export {Mininews, Mininews2, Minivideo, Mininews3}