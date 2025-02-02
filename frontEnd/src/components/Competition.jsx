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
            fetch(process.env.REACT_APP_API_LINK + "getall/banner")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);

    




    return (
        <div className={Style.competion}>

            <h1 >REGION</h1>

            <div className={Style.regions} > 
                
    
        {/* <div className="slider-container">
          <Slider {...settings}>
    
                     {banner.map((project) => (

                <div className={Style.perone} key={project._id}> 

                <CardList
                    text={project.text}
                    img={project.imgUrl.url}
                    />    
                    </div>


                )   )   }
                </Slider>

                </div> */}




                    
            {data.map((p) => (

                        <CardList 
                            name={"ebuawa"}
                            to={"competition"}
                            category={"Region"}
                            link={"ebuawa"}
                            logo={data.imgUrl?.url}

                        />  


            )   )   }
            </div>




        </div>

    )
}



export default Competition
