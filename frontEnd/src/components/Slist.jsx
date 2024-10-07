import {React, useState, useEffect} from "react";
import List from "./sub component/list/List";
import "../styles/style.css";
import { Link } from "react-router-dom";



const Menu = () => {

    const [product, setproduct] = useState([])


    console.log( process.env.REACT_APP_API_LINK)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/product")
        .then((res) =>  res.json())
        .then((data) => setproduct(data.data));
    }, []);




    return (

        

    <div className="try">  
       <h1>TRY THIS</h1>

    <div className="category">

 
        {product.slice(0, 4).map((project) => (

<div className="card" key={project._id}> 

  <List
      id={project._id}
      price={project.size[0].price}
      name={project.name}
      img={project.imgUrl[0].url}
      size={project.size[0]._id}

    />    
    </div>


)   )   }


    </div>
    <Link to={"/list"}> <button className={'more'} >MORE</button></Link>

   </div>

  )}

export default Menu