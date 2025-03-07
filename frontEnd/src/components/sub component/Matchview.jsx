import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../..//styles/Match.module.css"
import Styles from "../..//styles/News.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, Result, Table, Tablehead } from "./list/Tournamentlist";
import News, { Mininews } from "./list/Newslist";
import { Standing } from "./Hometournament";
import { TeamList, TeamSquadList } from "./list/Teamviewlist";




const LineUp = ({data, type, team}) => {
    

    return (
                        <div className={Style.starting_lineup} >
                         <h3 > <span > {team} </span> {type} </h3>


                        {data.map((project) => (


                        <TeamSquadList
                            name={project.head}
                            img={project.imgUrl.url}
                            link={project.head}
                            number={7}
                            />    


                        )   )   }
                        
                        </div>

    )
}


const TeamNews = ({}) => {
    
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
        <div className={Style.teamNews}>





                    <div className={Style.top} >
                    {news.slice(0, 1).map((project) => (

                    <div className='' key={project._id}> 

                    <News
                        head={project.head}
                        img={project.imgUrl.url}
                        link={project.head}
                        />    
                        </div>


                    )   )   }
                    </div>


                        {news.slice(1, 10).map((project) => (

                        <div className={Styles.perone} key={project._id}> 

                        <Mininews
                            head={project.head}
                            img={project.imgUrl.url}
                            link={project.head}
                            />    
                            </div>


                        )   )   }
                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}



const TeamFixtures = ({}) => {
    
    const [fixtures, setfixtures] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState({})

    const year = 2022 // new Date(2022).getFullYear()

    

    


    
    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setfixtures(data.data));
        }, []);


    




    return (
        <div className={Style.teamFix}>

            <h2 > Next Fixtures </h2>



                    <div className={Style.fix} >

                    {fixtures.slice(0, 3).map((project) => (

                                        
        <div className={Style.fixture}>

            <Fixture 
                // Hname={props.home?.name}
                // Hlogo={props.home?.logo[0].url}
                // Hscore={props.home.homeScore}

                // date={props.time.date}
                // time={props.time.time}

                // Ascore={props.away.awayScore}
                // Alogo={props.away?.logo[0].url}
                // Aname={props.away?.name}



                Hname={'kkkkk'}
                Hlogo={'00'}
                Hscore={3}

                date={'2/22/22'}
                time={'4pm'}

                Ascore={2}
                Alogo={1}
                Aname={'dddd'}

            />  







                        </div>


                    )   )   }
                    </div>
                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}



const TeamResults = ({}) => {
    
    const [fixtures, setfixtures] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState({})

    const year = 2022 // new Date(2022).getFullYear()

    

    


    
    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setfixtures(data.data));
        }, []);


    




    return (
        <div className={Style.teamRes}>

            <h2 > Next Fixtures </h2>



                    <div className={Style.res} >

                    {fixtures.slice(0, 3).map((project) => (

                                        
        <div className={Style.result}>

            <Fixture 
                // Hname={props.home?.name}
                // Hlogo={props.home?.logo[0].url}
                // Hscore={props.home.homeScore}

                // date={props.time.date}
                // time={props.time.time}

                // Ascore={props.away.awayScore}
                // Alogo={props.away?.logo[0].url}
                // Aname={props.away?.name}



                Hname={'kkkkk'}
                Hlogo={'00'}
                Hscore={3}

                date={'2/22/22'}
                time={'4pm'}

                Ascore={2}
                Alogo={1}
                Aname={'dddd'}

            />  







                        </div>


                    )   )   }
                    </div>
                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}



const TeamSquad = ({}) => {
    
    const [fixtures, setfixtures] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState({})

    const year = 2022 // new Date(2022).getFullYear()

    

    


    
    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setfixtures(data.data));
        }, []);


    




    return (
        <div className={Style.teamFix}>





                    <div className={Style.squads} >
                    {fixtures.map((project) => (


                    <TeamSquadList
                        name={project.head}
                        img={project.imgUrl.url}
                        link={project.head}
                        />    


                    )   )   }
                    </div>
                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}


export {LineUp, TeamNews, TeamFixtures, TeamResults, TeamSquad, }