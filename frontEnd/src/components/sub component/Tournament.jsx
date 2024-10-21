import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Tournament.module.css"
import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Fixture, Result, Table, Tablehead } from "./list/Tournamentlist";




const Standing = () => {


    return (
        <div className={Style.news}>
            <div className={Style.Nav}>
                
           <Tablehead />
              <Table />
              <Table />
              <Table />
              <Table />
              <Table />
              <Table />
              <Table />


     </div>
        </div>

    )
}




const Results = () => {


    return (
        <div className={Style.news}>
            <div className={Style.result}>


            <h2 > Results</h2>

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




const Fixtures = () => {


    return (
        <div className={Style.news}>
            <div className={Style.fix}>


            <h2> Fixtures</h2>

              <Fixture />
              <Fixture />
              <Fixture />
              <Fixture />
              <Fixture />
              <Fixture />
              <Fixture />





     </div>
        </div>

    )
}




export  {Standing, Fixtures, Results}
