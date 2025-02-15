import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Competition.module.css"
import News, {Minivideo} from "./sub component/list/Newslist"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixtures, Results, Standing } from "./sub component/Hometournament";
import { CardList } from "./sub component/list/Generallist";




const Competition = () => {


    const [data, setdata] = useState([])

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/competition")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);

        const settings = {
            dots: false,
            fade: false,
            infinite: true,
            autoplay: false,
            speed: 2000,
            autoplaySpeed: 6000,
            slidesToShow: 2,
            slidesToScroll: 2,
            cssEase: "linear",
            waitForAnimate: false,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
          };




    return (
        <div className={Style.competion}>

            <h1 >POPULAR REGION</h1>

            <div className={Style.regions} > 
                
    
       {/* <div className="slider-container">
          <Slider {...settings}>
    
                     {data.map((project) => (

                    <CardList 
                        name={"ebuawa"}
                        to={"competition"}
                        category={"Region"}
                        link={"ebuawa"}
                        logo={data.imgUrl?.url}
                    />    



                )   )   }
                </Slider>

                </div>  */}




                    
            {data.map((p) => (

                        <CardList 
                            name={p.name}
                            to={"region"}
                            category={"Region"}
                            logo={p.logo[0]?.url}

                        />  


            )   )   }


            </div>




        </div>

    )
}



export default Competition
