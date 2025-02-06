import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Competition.module.css"
import Nav from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Footer from "../components/sub component/Footer";
import { CardList2 } from "../components/sub component/list/Generallist";




const Competitions = ({}) => {

    const [data, setdata] = useState([])

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/banner")
            .then((res) =>  res.json())
            .then((data) => setdata(data.data));
        }, []);

        // useEffect(() => {
        //     fetch(process.env.REACT_APP_API_LINK  + "getall/product")
        //     .then((res) =>  res.json())
        //     .then((data) => setproduct(data.data));
        // }, []);
    
 

    //  useEffect(() => {
    //     fetch(process.env.REACT_APP_API_LINK  + "getone/wishlist/" + link, {
    //         credentials: "include",
    //         headers: { "Content-type": "application/json; charset=UTF-8", },
    //     }).then((res) =>  res.json())
    //     .then((data) =>  {
    //         if (data.data == "true") {
    //             setwish(faX)
    //             setset("active")
    //         } else {
    //             setwish(faHeart)
    //             setset("false")
    //         }
    //     } );
    // }, []);
    

    return (
        <div className={Style.competitions}>
         <Nav />

         <h3 > All Regions </h3>
            <div className={Style.allregions}>


                
            {data?.map((p) => (

            <CardList2 
                name={"ebuawa"}
                to={"competition"}
                category={"Region"}
                link={"ebuawa"}
                logo={data.imgUrl?.url}

            />  


            )   )   }


{data?.map((p) => (

<CardList2 
    name={"ebuawa"}
    to={"competition"}
    category={"Region"}
    link={"ebuawa"}
    logo={data.imgUrl?.url}

/>  


)   )   }





     </div>


        <Footer />
        </div>

    )
}





export default Competitions