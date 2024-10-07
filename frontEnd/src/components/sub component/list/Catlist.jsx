import React from "react";
import { Link } from "react-router-dom";
const List = ({name,  img, id}) => {




    return (

 
       <div className="cat">
            <Link to={"/category/" + id}>
              <div className="img">
                    <img src={img} alt="" />
              </div>
              
              <div className="cardText">
                <h2>{name}</h2>
              </div>

            </Link>
  
        </div>
    )
}

export default List