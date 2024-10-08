import React from "react";


const Banner = ({ text, img }) => {

    return (
    <div className="banner">
        <img src={img} alt="tea banner"/>
        <h2>{text}</h2>
    </div>
    )
}



const SBanner = ({ text, img, button }) => {

    return (
    <div className="sbanner">
        <img src={img} alt="tea banner"/>

        <div className="text">
        <p>
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

        
        <div className="text2">
             <h2>COMING SOON</h2>
        </div>

 
    </div>
    )
}




export default Banner

export {SBanner}