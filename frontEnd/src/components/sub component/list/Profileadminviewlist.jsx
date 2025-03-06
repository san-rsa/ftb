import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/admin/Profile.module.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { TeamSquadListWithPositionEdit } from "./Teamviewlist";
import { Mininews, MininewsEdit } from "./Newslist";
import { CardList2, CardList4 } from "./Generallist";




const AdminBannerList = ({teamid}) => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/banner/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.newsgrid}  >  


            {data.map((project) => (

                        
            <MininewsEdit
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
            fetch(process.env.REACT_APP_API_LINK + "getall/news/" )
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
                link={"./../" + project.head}

                />  


            )   )   }
                    

                    </div>







                    </div>

 

    )
}










const AdminRegionList = ({teamid}) => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/competition/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <CardList4
                name={project.name}
                logo={project.logo[0].url}
                category={"region"}
                link={"./../" + project.name}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}


export {AdminBannerList, AdminNewsList, AdminRegionList} 