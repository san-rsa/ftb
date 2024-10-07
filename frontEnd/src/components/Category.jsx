import List from "./sub component/list/Catlist";
import "../styles/style.css";
import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";


const Menu = () => {



 

   const [cat, setcat] = useState([])


    console.log( process.env.REACT_APP_API_LINK)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/category")
        .then((res) =>  res.json())
        .then((data) => setcat(data.data));
    }, []);





    return (
    <div className="cat">  
       <h1>CATEGORY</h1>

    <div className="cate">

    {cat.slice(0, 2).map((project) => (

        <div className='' key={project._id}> 

        <List
            id={project.slug}
            name={project.name}
            img={project.imgUrl.url}
            />    
            </div>


        )   )   }
 

 </div>
         {/* <Link to={"/catlist"}> <button className={'more'} >MORE</button></Link> */}


   </div>

  )}

export default Menu