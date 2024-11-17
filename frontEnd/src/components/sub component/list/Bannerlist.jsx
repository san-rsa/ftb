import React from "react";
import { Link } from "react-router-dom";


const Banner = ({ text, img, link }) => {

    return (

    <div className="banner">
        <img src={img} alt="tea banner"/>
        <h2>{text}</h2>
    </div>
    )
}



const SBanner = ({ body, img, head, link }) => {

    return (
    <div className="sbanner">
        <img src={img} alt="tea banner"/>

        <div className="text">
        <p>  {body}
Traffic

Feed layout

playIndicator

2d
October 7, 2023: The hours that shook Israel

Amazon UK
EA Play - 12 Month Subscription | Xbox - Download Code
Ad
Lab-grown foie gras coming to UK dinner tables - so, would YOU try it?
Daily Mail
Daily Mail
·
t
Traffic incident


4 minute delay due to slow traffic on M50 / Dublin Tunnel</p>
        </div>

        
       <Link to={link}> <div className="text2">
             <h2>CODE OF CONDUCT {head} </h2>
        </div> </Link>

 
    </div>
    )
}




export default Banner

export {SBanner}