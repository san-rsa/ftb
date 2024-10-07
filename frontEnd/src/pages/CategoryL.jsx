import {React, useEffect, useState} from "react";

import List  from "../components/sub component/list/List";
import Nav from "../components/sub component/Nav"
import { Navigate, useParams} from "react-router-dom";




const Menu = ({ text, img}) => {
    const [product, setproduct] = useState([])


    const link = useParams().id

    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getone/category/"+ link)
        .then((res) =>  res.json())
        .then((data) => setproduct(data.data));
    }, []);


    return (
        <div>
         <Nav />                
         <h1>CATEGORY</h1>
            <div className="menu">

          
            {product.map((data) => (

         
            <div className="card" key={data._id}> 

            <List
            price={data.size[0]['price']}
            id={data._id}
            name={data.name}
            img={data.imgUrl[0]}
            size={data.size[0]._id}

            />    
            </div>



            )   )   }
        </div>


     </div>

    )
}





export default Menu