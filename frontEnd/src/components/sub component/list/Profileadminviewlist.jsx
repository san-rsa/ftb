import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/admin/Profile.module.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { TeamSquadListWithPositionEdit } from "./Teamviewlist";
import { Mininews, MininewsEdit } from "./Newslist";
import { CardList4 } from "./Generallist";




const AdminBannerList = ({teamid}) => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/banner/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <Mininews
                head={project.head}
                img={project.imgUrl.url}
                category={"banner"}
                link={"./../" + project.head}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}






const AdminNewsList = ({teamid}) => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news/team/"  + teamid)
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>





         
                    <div className={Style.newsgrid} >



                {data.map((project) => (

                        
            <MininewsEdit
                head={project.head}
                img={project.imgUrl[0].url}
                />  


            )   )   }
                    

                    </div>







                    </div>

 

    )
}


export {AdminBannerList, AdminNewsList} 