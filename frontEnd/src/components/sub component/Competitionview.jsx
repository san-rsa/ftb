import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../..//styles/Competition.module.css"
import Styles from "../..//styles/News.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, Result, Table, Tablehead } from "./list/Tournamentlist";
import News, { Mininews } from "./list/Newslist";
import { Standing } from "./Hometournament";
import { TeamList, TeamSquadList } from "./list/Teamviewlist";





const CompetitionNews = ({regionId}) => {
    
    const [news, setnews] = useState([])


    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news/region/" + link)
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
                        img={project.imgUrl[0].url}
                        link={project.head}
                        />    
                        </div>


                    )   )   }
                    </div>


                        {news.slice(1, 10).map((project) => (

                        <div className={Styles.perone} key={project._id}> 

                        <Mininews
                            head={project.head}
                            img={project.imgUrl[0].url}
                            link={project.head}
                            />    
                            </div>


                        )   )   }
                


                    </div>

 

    )
}



const CompetitionFixtures = ({regionId}) => {
    
    const [data, setData] = useState([])
    const year = 2023 // new Date(2022).getFullYear()

    
    const [showAll, setShowAll] = useState(false);

    function handleClick() {
      setShowAll(prevShowAll => !prevShowAll);
    }
  

    

    


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/fixtures")
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);

    

      const show = showAll ? data.fixture : data.fixture?.slice(0, 1);



    return (
        <div className={Style.teamFix}>

            <h2 > Next Fixtures </h2>

     
              { data ? 
                   <div> 
           { show?.map((p) => (

                                        
        <div className={Style.fixture}>

            <h3 > matchday: {p.matchday} </h3>


                    <div className={Style.fix} >


                        {p.teams.map((props) => (

                            <Fixture 
                             Hname={props.home?.name}
                             Hlogo={props.home?.logo[0].url}
                             Hscore={props.home?.homeScore}

                             date={props.day?.date.slice(0, 10).replaceAll('-','/')} time={props.day?.time}
                             matchday={p.matchday}

                             Ascore={props.away?.awayScore}
                             Alogo={props.away?.logo[0].url}
                             Aname={props.away?.name}

                            live={props?.live} start={props?.start} 
                            half={props?.half} minutes={props?.time.now}


                            _id={props._id}
                            regionId={data.competition}





                            />  



                        )
                        ) } 
                    </div>







                        </div>


                    )   )   }
                    


                    <button  onClick={handleClick}> {showAll ? "Showless" : "showAll" } </button>




 </div>


              : <h1 > no fixtures availabe</h1>}



                    </div>

 

    )
}



const CompetitionResults = ({regionId}) => {
    
    const [data, setData] = useState([])
    const year = 2023 // new Date(2022).getFullYear()

    

    const [showAll, setShowAll] = useState(false);

  function handleClick() {
    setShowAll(prevShowAll => !prevShowAll);
  }

  const show = showAll ? data.result : data.result?.slice(0, 1);


    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/results")
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);


    




    return (
        <div className={Style.teamRes}>

            <h2 > Latest Results </h2>



            { data ? 

            <div >       
            
           
                    {show?.map((p) => (


        <div className={Style.result}>
             <h3 > matchday: {p.matchday} </h3>



                    <div className={Style.res} >


                {p.teams.map((props) => (

                <Result 
                Hname={props.home?.name}
                Hlogo={props.home?.logo[0].url}
                Hscore={props?.homeScore}

                date={props.day?.date} time={props.day?.time}
                matchday={p.matchday}


                Ascore={props?.awayScore}
                Alogo={props.away?.logo[0].url}
                Aname={props.away?.name}

                live={props?.live} start={props?.start} 
                half={props?.half} minutes={props?.time.now}


                _id={props._id}
                regionId={data.competition}





                />  



                )
                ) }







                        </div>

       </div>
                    )   )   }
             




                    
                        <button  onClick={handleClick}> {showAll ? "Showless" : "showAll" } </button>
                    
                         </div>

                : <h1 > no results availabe</h1>}


                    </div>

 

    )
}



const CompetitionTable = ({regionId}) => {
    
    const [data, setData] = useState({})

    const year = 2022 // new Date(2022).getFullYear()



    // useEffect(() => {
    //     fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/standing/" + year)
    //     .then((res) =>  res.json())
    //     .then((data) => setData(data.data));
    // }, []);


    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/" + regionId + "/standing/" + year)
        .then((res) =>  res.json())
        .then((data) => setData(data.data));
    }, []);


    




    return (
        <div className={Style.standing}>

            <h2 > Standing</h2>




            { data ? 



                (data.type == "cup") ? 
                                    <div className={Style.table} >

                        <Tablehead />
                    {data.group?.map((props, pos) => (
                        <div key={pos} >  

                        <h2 > group {props.group} </h2>

                        {props.standing?.map((props, pos) => (

                        <Table
                        key={pos + 1}
                         pos={pos + 1}
                         name={props.teams?.name}
                         logo={props.teams?.logo[0].url}
                          w={props.stats?.win} 
                          d={props.stats?.draw} 
                          l={props.stats?.loss} 
                          pts={props.stats?.points} 
                          pl={props.stats?.played} 
                          gd={props.stats?.gd} 
                          ga={props.stats?.ga} 
                          gs={props.stats?.gs}


                        />    
    
    
    
    
    
                        )   )   }




  </div>
                    )   )   }
                    </div> 

                    : (data.type == "league") ?


                    <div className={Style.table} >

                    <Tablehead />
            
                    {data.standing?.map((props, pos) => (

                    <Table
                    key={pos + 1}
                     pos={pos + 1}
                     name={props.teams?.name}
                     logo={props.teams?.logo[0].url}
                      w={props.stats?.win} 
                      d={props.stats?.draw} 
                      l={props.stats?.loss} 
                      pts={props.stats?.points} 
                      pl={props.stats?.played} 
                      gd={props.stats?.gd} 
                      ga={props.stats?.ga} 
                      gs={props.stats?.gs}


                    />    





                    )   )   }




                </div>  : null



                : <h1 > no table availabe</h1>}



                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}


export {CompetitionNews, CompetitionFixtures, CompetitionResults, CompetitionTable, }