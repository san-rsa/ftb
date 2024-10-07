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
        <p>{text}</p>
        </div>

        
        <div className="text2">
             <h2>{text}</h2>
        </div>

 
    </div>
    )
}




export default Banner

export {SBanner}