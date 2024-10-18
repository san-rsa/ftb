import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../styles/Tournament.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixtures, Result, Table, Tablehead } from "./sub component/Tournament";




const App = () => {


    return (
        <div className={Style.news}>
            <div className={Style.Nav}>

                <ul >
                    <li > Table</li>
                    <li >Fixtures</li>
                    <li >Result</li>
                    <li >Players</li>

                </ul>



                
              <Tablehead />
              <Table />
              <Table />
              <Table />
              <Table />
              <Table />
              <Table />
              <Table />


              <Fixtures />
              <Fixtures />
              <Fixtures />
              <Fixtures />
              <Fixtures />
              <Fixtures />
              <Fixtures />

              <Result />
              <Result />
              <Result />
              <Result />
              <Result />
              <Result />
              <Result />
              <Result />




     </div>
        </div>

    )
}



export default App
