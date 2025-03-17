import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/News.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';



const News = ({img, head, body, }) => {

    const newsLink =head.replaceAll(' ','-')

    return (
            <Link to={ "/news/" + newsLink} className={Style.news}>
            <div className={Style.news1}>

                <div className={Style.img1} >
                    <img src={  img } />
                </div>

                
                <div className={Style.text1} >
                    
                    <div className={Style.head1}>
                        <h2 >  {head} </h2>
                    </div>

                    
                    <div className={Style.body1} >
                        <p >  {body} </p>
                    </div>
                </div>


                </div>
            </Link>

    )
}




const Mininews = ({img, head, }) => {

    const newsLink =head.replaceAll(' ','-')

    return (
           <Link to={"/news/" + newsLink} className={Style.newsm}>
            <div className={Style.news2}>


 
                    <div className={Style.img2} >
                        <img src={img} />
                    </div>

                    
                    <div className={Style.text2} >
                        
                        <div className={Style.head2}>
                            <h2 >  {head} </h2>
                        </div>

                    </div>


                </div>
              </Link>
  

    )
}




const Mininews2 = ({img, head, link, id}) => {

    const newsLink =link.replaceAll(' ','-')

    return (
  
        <Link to={"/news/" + newsLink} className={Style.newsm}>
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
        </Link>    
    )
}



const Minivideo = ({img, head, link, body}) => {

    const videoLink =head.replaceAll(' ','-')

    return (
        <div className={Style.newsm}>
            <Link to={"/video/" + videoLink}>
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



const Mininews3 = ({img, head,link, id}) => {

    const newsLink =head?.replaceAll(' ','-')

    return (
            <Link to={ "/news/" + newsLink } className={Style.newsm}>
            <div className={Style.news3}>


            
                <div className={Style.img3} >
                     <img src={img} />
                </div>

                
                <div className={Style.text3} >
                    
                    <div className={Style.head3}>
                        <h2 > {head} </h2>
                    </div>

                </div>


                </div>
            </Link>

    )
}











const MininewsEdit = ({img, head,  link }) => {

    const to = link.replaceAll(' ','-')

    
    return (
           <Link to={ to}>
            <div className={Style.news2} className={Style.newsm}>


 
                    <div className={Style.img2} >
                        <img src={img} />
                    </div>

                    
                    <div className={Style.text2} >
                        
                        <div className={Style.head2}>
                            <h2 >  {head}</h2>
                        </div>

                    </div>


                </div>
              </Link>

    )
}


export default News
export {Mininews, Mininews2, Minivideo, Mininews3, MininewsEdit}