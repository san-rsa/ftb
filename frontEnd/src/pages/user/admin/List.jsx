
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/admin/Profile.module.css"
import Nav from "../../../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Footer from "../../../components/sub component/Footer";
import { AdminBannerList, AdminMatchFixtureList, AdminMatchRegionList, AdminNewsList, AdminRegionList, AdminSubRegionList, AdminTeamList } from "../../../components/sub component/list/Profileadminviewlist";
import { AdminAddTeamToRegion, AdminTeam } from "../../../components/sub component/Profileadminview";








const List = ({}) => {
    const [mode1, setEvent] = useState({add: false, edit: false, });

    const [mode2, setType] = useState({banner: false, team:false, fixture: false, news: false, region: false, user: false, "sub-region": false,  });

    const [data, setData] = useState({})

    
    const {id, event, type, typeId } = useParams()

    const teamid =id?.replaceAll('-',' ')




        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + teamid)
            .then((res) =>  res.json())
            .then((data) => setData(data));
        }, []);


        useEffect(() => {            
                
                setEvent(values => ({...values, [event]: true}))

                setType(values => ({...values, [type]: true}))

              


        }, []);



        console.log(mode1, mode2, id, event, type, typeId);
        






        // const handleChange = (event) => {
        //     const name = event.target.innerHTML.toLowerCase();
    
        //     setInputs({overview: false, news: false, fixtures: false, results: false, squad: false, admin: false, transfer: false, official: false });

            
        //     setInputs(values => ({...values, [name]: true}))
        //   }
        
        //   console.log(mode);
    
    
    

         
        

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


    if ("condition" !== 9 && 7 == 7) {
       console.log('jj');
       
    } else {
        console.log('jj');

    }



    return (
        <div>
         <Nav />
            <div className={Style.app}>

            <h1 > {mode1.add ? "add" :  mode1.edit ? "edit" : null }  list </h1>



         <div className={Style.section} >

            { mode2.banner && <AdminBannerList teamid={teamid} event={mode1} typeId={typeId} />}

            { mode2.news && <AdminNewsList teamid={teamid} event={mode1} typeId={typeId} />}

            { mode2.region && <AdminRegionList teamid={teamid} event={mode1} typeId={typeId} />}
            
            { mode2["sub-region"] && <AdminSubRegionList teamid={teamid} event={mode1} typeId={typeId} />}

           { mode2.fixture ? mode1.add  ?  <AdminRegionList teamid={teamid} event={mode1} typeId={typeId}/>  : mode1.edit ? !typeId ?  <AdminMatchRegionList teamid={teamid} event={mode1} typeId={typeId}/>  :  <AdminMatchFixtureList teamid={teamid} event={mode1} typeId={typeId} regionid={typeId}/> : null : null}
          
           { mode2["add-team-to-region"] &&  <AdminRegionList event={mode1} regionId={id} /> } 

           { mode2.team &&  <AdminTeamList event={mode1} typeId={typeId} /> } 



                    {/*  { mode.news && <TeamNews />}

            { mode.fixtures && <TeamFixtures />}

            { mode.results && <TeamResults />}

            { mode.squad && <TeamSquad />}

            { mode.admin && <TeamAdmin />} */}



         </div>






     </div>

     <Footer />
        </div>

    )
}





export default List