import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../..//styles/Player.module.css"
import Styles from "../..//styles/News.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, Result, Table, Tablehead } from "./list/Tournamentlist";
import News, { Mininews } from "./list/Newslist";
import { Standing } from "./Hometournament";
import { PlayerBio, } from "./list/Playerviewlist";
import { CardList } from "./list/Generallist";




const Info = ({}) => {
    
    const [news, setnews] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState({})

    const year = 2022 // new Date(2022).getFullYear()

    


    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/672a24205fa419f32c581933/standing/" + year)
        .then((res) =>  res.json())
        .then((data) => setStand(data.data));
    }, []);


    


    
    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setnews(data.data));
        }, []);

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams")
            .then((res) =>  res.json())
            .then((data) => setotherTeams(data.data));
        }, []);
    



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/news/" + link)
            .then((res) =>  res.json())
            .then((data) => setData(data));
        }, []);







    return (
        <div className={Style.info}>





                    <div className={Style.teams} >

                        <h2 > Team</h2>

                    
                        <CardList 
                            name={"ebuawa"}
                            to={"team"}
                            category={"Team"}
                            link={"ebuawa"}
                            logo={data.imgUrl?.url}

                        />

                        </div>




                        <div className={Style.stats}> 

                            <h2 > KEY STATS</h2>

                            <div className={Style.bio}>

                                <PlayerBio
                                    topic={"Age"}
                                    answer={"22"}
                                />

                                <PlayerBio
                                    topic={"Country"}
                                    answer={"22"}
                                />

                                <PlayerBio
                                    topic={"Position"}
                                    answer={"22"}
                                />

                                <PlayerBio
                                    topic={"Height"}
                                    answer={"22"}
                                />

                                <PlayerBio
                                    topic={"Weight"}
                                    answer={"22"}
                                />

                                <PlayerBio
                                    topic={"Jersey number"}
                                    answer={"22"}
                                />





                            </div>
                            
                         </div>
                    
                    

                        </div>


    )
}


const Season = ({}) => {
    
    const [news, setnews] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState({})

    const year = 2022 // new Date(2022).getFullYear()

    

    


    
    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setnews(data.data));
        }, []);


    




    return (
        <div className={Style.season}>

            <div className={Style.stats}>
                               
                               
            <h2 > KEY STATS</h2>


            <div className={Style.stat}>


                    <PlayerBio
                    topic={"Appearances"}
                    answer={"22"}
                    />

                    <PlayerBio
                    topic={"Goals"}
                    answer={"22"}
                    />

                    <PlayerBio
                    topic={"Assists"}
                    answer={"22"}
                    />

                    <PlayerBio
                    topic={"Yellow cards"}
                    answer={"22"}
                    />

                    <PlayerBio
                    topic={"Red cards"}
                    answer={"22"}
                    />

                    <PlayerBio
                    topic={"Jersey number"}
                    answer={"22"}
                    />





                    </div>
            </div>








                    </div>

 

    )
}





export {Info, Season,  }