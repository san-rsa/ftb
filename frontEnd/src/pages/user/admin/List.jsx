
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../../styles/admin/Profile.module.css"
import Nav from "../../../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import Footer from "../../../components/sub component/Footer";
import { AdminBannerList, AdminMatchFixtureList, AdminMatchRegionList, AdminNewsList, AdminRegionList, AdminSubRegionList, AdminTeamList } from "../../../components/sub component/list/Profileadminviewlist";








const List = ({}) => {
    const [mode1, setEvent] = useState({add: false, edit: false, });

    const [mode2, setType] = useState({banner: false, team:false, fixture: false, news: false, region: false, user: false, "sub-region": false, user: false  });


    
    const {event, type, typeId } = useParams()





        useEffect(() => {            
                
                setEvent(values => ({...values, [event]: true}))

                setType(values => ({...values, [type]: true}))

              


        }, []);




    return (
        <div>
         <Nav />
            <div className={Style.app}>

            <h1 > {mode1.add ? "add" :  mode1.edit ? "edit" : null }  list </h1>



         <div className={Style.section} >

            { mode2.banner && <AdminBannerList  />}

            { mode2.news && <AdminNewsList  />}

            { mode2.region && <AdminRegionList   />}
            
            { mode2["sub-region"] && <AdminSubRegionList   />}

           { mode2.fixture ? mode1.add  ?  <AdminRegionList  />  : mode1.edit ? !typeId ?  <AdminMatchRegionList />  :  <AdminMatchFixtureList regionid={typeId}/> : null : null}
          
           { mode2["add-team-to-region"] &&  <AdminRegionList  /> } 

           { mode2.user &&  <AdminTeamList  /> } 


           { mode2.team &&  <AdminTeamList /> } 



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