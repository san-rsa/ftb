import React, { useState, useEffect } from "react";
import Style from "../../../styles/Team.module.css"
import Nav from "../../../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import Footer from "../../../components/sub component/Footer";
import { AdminAddTeamToRegion, AdminBanner, AdminFixture, AdminNews, AdminRegion, AdminSubRegion, AdminTeam } from "../../../components/sub component/Profileadminview";




const Add = ({}) => {
    const [mode1, setEvent] = useState({add: false, edit: false, delete: false });

    const [mode2, setType] = useState({banner: false, news: false, region: false, user: false, "add-team-to-region": false, "sub-region": false,  });
    
    const { event, type, matchId } = useParams()

    const typeId = useParams().typeId?.replaceAll('-',' ')

    


        useEffect(() => {            
                
                setEvent(values => ({...values, [event]: true}))

                setType(values => ({...values, [type]: true}))

              


        }, []);



        console.log(mode1, mode2, event, type, typeId);
        




    return (
        <div>
         <Nav />
            <div className={Style.app}>




         <div className={Style.section} >

            { mode2.banner && <AdminBanner event={mode1} typeId={typeId} />}

            { mode2.news && <AdminNews  event={mode1} typeId={typeId} />}


            { mode2.region && <AdminRegion event={mode1} typeId={typeId} />}

            { mode2["sub-region"] && <AdminSubRegion event={mode1} typeId={typeId} />}

           { mode2.fixture &&  <AdminFixture event={mode1} regionId={typeId} typeId={matchId}/> } 

           { mode2["add-team-to-region"] &&  <AdminAddTeamToRegion event={mode1} regionId={typeId} /> } 



            { mode2.results && <AdminNews  event={mode1} typeId={typeId} />}

            { mode2.team &&  <AdminTeam event={mode1} regionId={typeId} typeId={typeId}/> } 

  {/* 
            { mode.squad && <TeamSquad />}

            { mode.admin && <TeamAdmin />} */}



         </div>






     </div>

     <Footer />
        </div>

    )
}





export default Add