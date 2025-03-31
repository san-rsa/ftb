import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/Matchupdate.module.css"
import { CardList4 } from "./Generallist";
import Nav from "../Nav";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { AdminAddAdmin, AdminAddUserToTeam } from "../Profileadminview";
import { AddMatchLineup } from "../Matchupdate";





const MatchUpdateList = () => {



    return (
        <div className={Style.app}>

            <Nav />


            <h1 > Update Match</h1>



            <div className={Style.list}  >  

                        
            <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />  

            <CardList4
                name={"start"} logo={""} category={"begin"} link={"start" } /> 

            <CardList4
                name={"extra time"} logo={""} category={"injury time"} link={"extra-time" } />  

           {/* <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />  

             <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />  

            <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />  

            <CardList4
                name={"lineups"} logo={""} category={"line-up"} link={"lineup" } />   */}



            <CardList4
               name={"goal"} logo={""} category={"goal"} link={"goal" } />  


            <CardList4
               name={"yellow card"} logo={""} category={"foul"} link={"yellow" } /> 

            <CardList4
               name={"red card"} logo={""} category={"foul"} link={"red" } /> 

            <CardList4
               name={"substitution"} logo={""} category={"sub"} link={"substitution" } />  

                      

  </div>
         <Footer />


  </div>

                
 

    )
}



const MatchUpdate = ({}) => {

    const [data, setData] = useState([])
    const [mode2, setType] = useState({start: false, "extra-time": false, lineup: false, yellow: false, red: false, substitution: false, goal: false,   });
    const [user, setUser] = useState({team: false, })    
    const [match, setMatch] = useState({})

    const [competition, setRegion] = useState({})
    


    const {id, matchId, matchday, type} = useParams()
    const region =id?.replaceAll('-',' ');





            useEffect(() => {                         
                setType(values => ({...values, [type]: true}))

                fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + region)
                .then((res) =>  res.json())
                .then((data) =>  setRegion(data))
 


            fetch(process.env.REACT_APP_API_LINK + 'getaccess/team', {
            method: 'GET',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
             }).then((res) => {
            if (res.status === 200) {
                setUser({team: true})

            } 
        })


        fetch(process.env.REACT_APP_API_LINK + "getone/" + region + "/fixture/" + matchId)
        .then((res) =>  res.json())
        .then((data) => setMatch(data));

            }, []);






    




    return (
        <div className={Style.app}>

            <Nav />
                      
            { mode2.lineup &&  <AddMatchLineup competition={competition} match={match} matchId={matchId}  matchday={matchday} /> } 

            { mode2.start &&  <AdminAddAdmin competition={competition} match={match}matchId={matchId}  matchday={matchday}  /> } 

            { mode2["extra-time"] &&  <AdminAddAdmin competition={competition} match={match} matchId={matchId}  matchday={matchday} /> } 

            { mode2.red &&  <AdminAddAdmin competition={competition} match={match} matchId={matchId} matchday={matchday}  /> } 

            { mode2.yellow &&  <AdminAddAdmin competition={competition} match={match} matchId={matchId}  matchday={matchday} /> } 

            { mode2.substitution &&  <AdminAddAdmin competition={competition} match={match} matchId={matchId} matchday={matchday}  /> } 

            { mode2.goal &&  <AdminAddAdmin competition={competition} match={match} matchId={matchId} matchday={matchday}  /> } 







            <Footer />

                    </div>

 

    )
}











const AdminTeamList = () => {

    const [data, setData] = useState([])
   



        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/teams/" )
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <CardList4
                name={project.name}
                logo={project.logo[0]?.url}
                category={"team"}
                link={"./../" + project.name}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}











const AdminAdminList = ({event}) => {

    const [data, setData] = useState([])
   


    useEffect(() => {
     
      if (event.add ) {
        fetch(process.env.REACT_APP_API_LINK  + 'getall/user/', {
          method: "GET",
          credentials: "include",
          headers: {'Content-Type': 'application/json'},
        }  )
        .then((res) =>  res.json())
        .then((data) =>  setData(data.data))

    } else if (event.delete) {

      fetch(process.env.REACT_APP_API_LINK  + 'getall/admin/', {
        method: "GET",
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) =>  res.json())
      .then((data) =>  setData(data.data))

    }

      
      }, []);



    




    return (
        <div className={Style.app}>



            <div className={Style.list}  >  


            {data.map((project) => (

                        
            <CardList4
                name={project.name.first + " " + project.name.last}
                logo={project.imgUrl?.url}
                category={event.add ? "user" : event.delete ? "admin" : "error no category"}
                link={"./../" + project._id}

                />  


            )   )   }


         
                      

  </div>

                    








                    </div>

 

    )
}
export {MatchUpdateList, MatchUpdate } 