
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/admin/Team.module.css"
import Nav from "../../components/sub component/Nav"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Footer from "../../components/sub component/Footer";
import { TeamAdminPlayer } from "../../components/sub component/TeamAdminview";
import { CardList3Edit } from "../../components/sub component/list/Generallist";
import { TeamSquadListEdit, TeamSquadListWithPositionEdit } from "../../components/sub component/list/Teamviewlist";










const List = ({}) => {
    
    const [fixtures, setfixtures] = useState([])
    const [otherTeams, setotherTeams] = useState([])
    const [stand, setStand] = useState([])
    const [data, setData] = useState([])

    const year = 2022 // new Date(2022).getFullYear()

    

    


    
    const team = useParams().id.replaceAll('-',' ')


        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getall/players/" + team)
            .then((res) =>  res.json())
            .then((data) => setData(data.data));
        }, []);



    




    return (
        <div className={Style.app}>


            <h1 > edit list </h1>





         



                    <TeamSquadListWithPositionEdit pos={"Goalkeeper"} data={data} />
                    <TeamSquadListWithPositionEdit pos={"Defender"} data={data} />
                    <TeamSquadListWithPositionEdit pos={"Midfielder"} data={data} />
                    <TeamSquadListWithPositionEdit pos={"Foward"} data={data} />                       


                    



         

                {/* <div className={Style.latestV} >
                    <h2 > Latest Videos </h2>


                </div> */}




                    </div>

 

    )
}





export default List