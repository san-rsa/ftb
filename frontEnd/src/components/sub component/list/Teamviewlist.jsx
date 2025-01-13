import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Team.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Topic } from "../components/sub component/list/Newsviewlist";




const Overview = ({}) => {
    const [mode, setInputs] = useState({overview: true, news: false, fixtures: false, results: false, squad: false, transfer: false, official: false });

    const [data, setData] = useState({})
    const [wishlist, setwish] = useState()
    const [set, setset] = useState('')
    const [priced, setpriced] = useState(Number())




    
    const title = useParams().id

    const link =title.replaceAll('-',' ')




        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/news/" + link)
            .then((res) =>  res.json())
            .then((data) => setData(data));
        }, []);







    return (
        <div>
            <div className={Style.app}>

        <div className={Style.head} >

        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={data.imgUrl?.url}/>

        </div>
                

            
        <div className={Style.name}>
            <h1 > <span > {data.head} </span> </h1>
        </div>    
        


        </div>





        









     </div>
        </div>

    )
}





export {Overview, }