import React, { useState, useEffect } from "react";
import Style from "../../../styles/Match.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from "../../../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Footer from "../../../components/sub component/Footer";
import { CompetitionFixtures, CompetitionNews, CompetitionResults, CompetitionTable } from "../../../components/sub component/Competitionview";
import { MatchCompetition, MatchEventAway, MatchEventHome, MatchTeam, MatchTime } from "../../../components/sub component/list/Matchlist";
import { TeamSquadList } from "../../../components/sub component/list/Teamviewlist";
import { LineUp } from "../../../components/sub component/Matchview";




const Fixture  =  ({})  =>  {
    const [mode, setInputs] = useState({home: true, away: true, });

    const [competition, setRegion] = useState({})
    const [data2, setData2] = useState([])
    const [set, setset] = useState('')
    const [screenSize, setScreenSize] = useState({width: window.innerWidth, height: window.innerHeight,});

    var width = window.innerWidth
    
    const {id, matchId} = useParams()

    const region =id?.replaceAll('-',' ');


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + region)
            .then((res) =>  res.json())
            .then((data) => setRegion(data));
        }, []);


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/news")
            .then((res) =>  res.json())
            .then((data) => setData2(data.data));
        }, []);
  










        const handleChange = (event) => {
            const name = event.target.innerHTML.toLowerCase();
    
            setInputs({home: false, away: false, });
            setInputs(values => ({...values, [name]: true}))
          }
            




            
              useEffect(() => {
                const handleResize = () => {
                  setScreenSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                  });
          
                  widths()
                };
          
          
                widths()
          
            
                window.addEventListener('resize', handleResize);
          
            
            
                // Clean up the event listener when the component unmounts
                return () => {
                  window.removeEventListener('resize', handleResize);
                };
              }, [width]);






          
              function widths() {
                if (screenSize.width <= 650) {


                    setInputs({home: true, away: false, });


                } else {
                    setInputs({home: true, away: true, });

                }


              }
            
          
    
    

         
        

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
    //      function wish(e) {
    //         e.preventDefault()
    //         const  mood = wishlist.iconName


    //         if (mood == "heart") {
    //             fetch(process.env.REACT_APP_API_LINK + "add/wishlist", {
    //             method: "POST",
    //             credentials: "include",
    //             headers: {
    //               "Content-type": "application/json",
    //             },
    //             body: JSON.stringify({productId: data._id }),
    //          }).then((res) =>  res.json())
    //          .then( ()=> setwish(faX))



    //         } else {
    //             fetch(process.env.REACT_APP_API_LINK + "del/wishlist", {
    //                 method: "DELETE",
    //                 credentials: "include",
    //                 headers: {
    //                   "Content-type": "application/json",
    //                 },
    //                 body: JSON.stringify({productId: data._id }),
    //              }).then((res) =>  res.json())
    //              .then( ()=> setwish(faHeart))
    //         }



    //    }



    return (
        <div>
         <Nav />
            <div className={Style.app}>











                         <div className={Style.top}>

                                    <MatchCompetition name={'agbedian'} logo={'77'} />

                                <div className={Style.head} >


                            
                                <MatchTeam name={'arsenal '} logo={"rr"} />


                                <MatchTime day={'fri 22, feb'} time={'2 pm'} />

                                <MatchTeam name={'man u '} logo={"rr"} />

                                

                                    
                               
                                
                                </div>

    
         
         
      
  
                         </div>

         <div className={Style.section} >


            <div className={Style.events} >

                <h2 > Timeline</h2>

                <div className={Style.timeline}>

                    <MatchEventHome name={"eeegg"} assist={"tttyjkkk yyyyrrr"} />
                    <MatchEventAway name={"eeegg"} assist={"tttyjkkk yyyyrrr"} />

                </div>


            </div>

            <div className={Style.lineups} >
                <h2> Line-ups </h2>


                    <div className={Style.list}>
               
                               <ul >
                                   <li onClick={handleChange}  >Home</li>
                                   <li onClick={handleChange} >Away</li>
               
                               </ul>
            
               
                   </div>


                   <div className={Style.lineup} >




                    { mode.home &&                   
                    
                    <div className={Style.home} >

                        <LineUp data={data2} type={"Starting"} team={"Home"} />

                        <LineUp data={data2} type={"Sub"} team={"Home"} />


                    </div> }





                   { mode.away && 
                                       <div className={Style.away} >

                        <LineUp data={data2} type={"Starting"} team={"Away"}/>

                        <LineUp data={data2} type={"Sub"} team={"Away"} />


                        </div>

                   }



                   </div>



            </div>

     
     



         </div>






     </div>

     <Footer />
        </div>

    )
}




export default Fixture