import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../..//styles/Team.module.css"
import Styles from "../..//styles/News.module.css"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, Result, Table, Tablehead } from "./list/Tournamentlist";
import { Mininews } from "./list/Newslist";




const Overview = ({}) => {
    
    const [mode, setInputs] = useState({overview: true, news: false, fixtures: false, results: false, squad: false, transfer: false, official: false });
    const [news, setnews] = useState([])
    const [data, setData] = useState({})
    const [wishlist, setwish] = useState()
    const [set, setset] = useState('')
    const [priced, setpriced] = useState(Number())



    


    
    const title = useParams().id

    const link =title.replaceAll('-',' ')

    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setnews(data.data));
        }, []);
    



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/news/" + link)
            .then((res) =>  res.json())
            .then((data) => setData(data));
        }, []);







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



                {/* <div className={Style.standing} >
                    <h2 > Standing</h2>


                </div> */}


                {/* <div className={Style.form} >
                    <h2 > Form Guide</h2>


                </div> */}

                <div className={Style.latestN} >
                    <h2 > Latest News</h2>


                    <div className={Style.news} >
                        {news.slice(1, 5).map((project) => (

                        <div className={Styles.perone} key={project._id}> 

                        <Mininews
                            head={project.head}
                            img={project.imgUrl.url}
                            link={project.head}
                            />    
                            </div>


                        )   )   }
                    </div>
                    



                </div>

                <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div>




                    </div>

                    <div className={Style.right} >

                    </div>
        </div>
        </div>

    )
}





export {Overview, }