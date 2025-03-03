import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../..//styles/Team.module.css"
import Styles from "../..//styles/News.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart, faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, Result, Table, Tablehead } from "./list/Tournamentlist";
import News, { Mininews } from "./list/Newslist";
import { Standing } from "./Hometournament";
import { TeamList, TeamSquadList, TeamSquadListWithPosition } from "./list/Teamviewlist";
import { CardList2, CardList3, CardList3Edit } from "./list/Generallist";




const Overview = ({id}) => {
    
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
            fetch(process.env.REACT_APP_API_LINK + "getall/news/team/" + id)
            .then((res) =>  res.json())
            .then((data) => setnews(data.data));
        }, []);

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams")
            .then((res) =>  res.json())
            .then((data) => setotherTeams(data.data));
        }, []);
    



        // useEffect(() => {
        //     fetch(process.env.REACT_APP_API_LINK  + "getone/news/" + link)
        //     .then((res) =>  res.json())
        //     .then((data) => setData(data));
        // }, []);







    return (
        <div className={Style.overview}>


        <div className={Style.layout} >

                    <div className={Style.left} >

                    <div className={Style.matches}>

        <div className={Style.result} >

            <h2 > Latest Results </h2>


            <Result
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
                

            
        <div className={Style.fixture}>

            <h2 > Next Match </h2>


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


        </div>



                <div className={Style.standing} >
                    <h2 > Standing</h2>


           <Tablehead />
   
              {stand.standing?.slice(0, 5).map((props, pos) => (



                <Table
                    pos={pos + 1}
                    name={props.teams.name}
                    logo={props.teams.logo[0].url}
                    w={props.stats.win} 
                    d={props.stats.draw} 
                    l={props.stats.loss} 
                    pts={props.stats.points} 
                    pl={props.stats.played} 
                    gd={props.stats.gd} 
                    ga={props.stats.ga} 
                    gs={props.stats.gs}
                    />    



                )   )   }

                </div>


                {/* <div className={Style.form} >
                    <h2 > Form Guide</h2>


                </div> */}

                <div className={Style.latestN} >
                    <h2 > Latest News</h2>


                    <div className={Style.news} >
                        {news.slice(0, 5).map((project) => (

                        <div className={Styles.perone} key={project._id}> 

                        <Mininews
                            head={project.head}
                            img={project.imgUrl[0].url}
                            link={project.head}
                            />    
                            </div>


                        )   )   }
                    </div>
                    



                </div>

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

                    <div className={Style.right} >
                        <div className={Style.otherTeams} >
                        <h2 > Other teams</h2>

                        {otherTeams.slice(1, 5).map((project) => (

                            <div className={Style.perone} key={project._id}> 

                            <TeamList
                                name={project.name}
                                logo={project.logo[0].url}
                                link={project.name}
                                />    
                                </div>


                        )   )   }

                        </div>

                    </div>
        </div>
        </div>

    )
}


const TeamNews = ({id}) => {
    
    const [news, setnews] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState({})


    

    


    
    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news/team/" + id)
            .then((res) =>  res.json())
            .then((data) => setnews(data.data));
        }, []);


    




    return (
        <div className={Style.teamNews}>





                    <div className={Style.top} >
                    {news.slice(0, 1).map((project) => (


                    <News
                        head={project.head}
                        img={project.imgUrl[0].url}
                        link={project.head}
                        />    


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



const TeamFixtures = ({id}) => {
    
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

                    {fixtures.slice(0, 3).map((props) => (

                                        
        <div className={Style.fixture}>

                        <Fixture 
                             Hname={props.home?.name}
                             Hlogo={props.home?.logo[0].url}
                             Hscore={props.home?.homeScore}

                             date={props.day?.date} time={props.day?.time}

                             Ascore={props.away?.awayScore}
                             Alogo={props.away?.logo[0].url}
                             Aname={props.away?.name}

                            live={props?.live} start={props?.start} 
                            half={props?.half} minutes={props?.time?.now}


                            _id={props._id}
                            regionId={data.competition}


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



const TeamResults = ({id}) => {
    
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

            <h2 > Results </h2>



                    <div className={Style.res} >

                    {fixtures.slice(0, 3).map((props) => (

                                        
        <div className={Style.result}>
                <Result 
                Hname={props.home?.name}
                Hlogo={props.home?.logo[0].url}
                Hscore={props.home?.homeScore}

                date={props.day?.date} time={props.day?.time}

                Ascore={props.away?.awayScore}
                Alogo={props.away?.logo[0].url}
                Aname={props.away?.name}

                live={props?.live} start={props?.start} 
                half={props?.half} minutes={props?.time?.now}


                _id={props._id}
                regionId={data.competition}





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



const TeamSquad = ({id}) => {
    
    const [fixtures, setfixtures] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState([])

    const year = 2022 // new Date(2022).getFullYear()

    

    


    
    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/players/" + id)
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);


    




    return (
        <div className={Style.teamFix}>


            {/* <div className={Style.pos} >


                <h2>   </h2>

                    <div className={Style.squads} >

                    {data.map((project) => (




                    <TeamSquadList
                        name={project.head}
                        img={project.imgUrl.url}
                        link={project.head}
                        />    


                    )   )   }
                    </div>
                    
                </div> */}





                    <TeamSquadListWithPosition pos={"Goalkeeper"} data={data} />
                    <TeamSquadListWithPosition pos={"Defender"} data={data} />
                    <TeamSquadListWithPosition pos={"Midfielder"} data={data} />
                    <TeamSquadListWithPosition pos={"Foward"} data={data} />









                    </div>

 

    )
}





const TeamAdmin = ({}) => {
    
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
        <div className={Style.teamAdmin}>





        <div className={Style.teamadminmenu} >

            <h2 > Players</h2>

            <div className={Style.teamadminmenulist} >
                <CardList3 name={"Players"} to={"add"} category={"add"} link={"player"} logo={faPlus} />  
                <CardList3Edit name={"Players"} to={"edit"} category={"edit"} link={"player"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>


        </div>

        
        <div className={Style.teamadminmenu} >


            <h2 > News</h2>

            <div className={Style.teamadminmenulist} >
                <CardList3 name={"News"} to={"add"} category={"add"} link={"news"} logo={faPlus} />  
                <CardList3Edit name={"News"} to={"edit"} category={"edit"} link={"news"} logo={faPenToSquare} id={"list"} />  
                {/* <CardList3 name={"ebuawa"} to={"region"} category={"delete"} link={"ebuawa"} logo={faTrash} />   */}
      
            </div>
            
        </div>



                    



         




                    </div>

 

    )
}


export {Overview, TeamNews, TeamFixtures, TeamResults, TeamSquad, TeamAdmin }