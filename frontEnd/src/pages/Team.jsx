import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Team.module.css"
import Nav from "../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Topic } from "../components/sub component/list/Newsviewlist";
import { Overview, TeamFixtures, TeamNews, TeamResults, TeamSquad } from "../components/sub component/Teamview";
import Footer from "../components/sub component/Footer";




const Team = ({}) => {
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


        console.log(process.env.REACT_APP_API_LINK);
        


        console.log(data);






        const handleChange = (event) => {
            const name = event.target.innerHTML.toLowerCase();
    
            setInputs({overview: false, news: false, fixtures: false, results: false, squad: false, transfer: false, official: false });

            
            setInputs(values => ({...values, [name]: true}))
          }
        
          console.log(mode);
    
    
    

         
        

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

        <div className={Style.head} >

        <div className={Style.img}>
                {/* <img src={info?.imgUrl} alt=""/> */}
                <img src={data.imgUrl?.url}/>

        </div>
                

            
        <div className={Style.name}>
            <h1 > <span > {data.head} </span> </h1>
        </div>    
        


        </div>



                <div className={Style.list}>
    
                    <ul >
                        <li onClick={handleChange} >Overview</li>
                        <li onClick={handleChange}  >News</li>
                        <li onClick={handleChange} >Fixtures</li>
                        <li onClick={handleChange}  >Results</li>
                        <li onClick={handleChange}  >Squad</li>
                        {/* <li onClick={handleChange}  >Transfer</li> */}
                        {/* <li onClick={handleChange}  >Official</li> */}
    
                    </ul>
    
    
    
                    
              
                 {/* { mode.fixtures && <Fixtures />}
    
                 { mode.results &&  <Results />} */}
    
         </div>

         <div className={Style.section} >

            { mode.overview && <Overview />}

            { mode.news && <TeamNews />}

            { mode.fixtures && <TeamFixtures />}

            { mode.results && <TeamResults />}

            { mode.squad && <TeamSquad />}



         </div>






     </div>

     <Footer />
        </div>

    )
}





export default Team