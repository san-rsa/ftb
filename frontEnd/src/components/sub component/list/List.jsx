import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from 'react-toastify';


const List = ({name, price, img, id, size}) => {




     async function addToCart() {
        try {
          const response = await fetch(process.env.REACT_APP_API_LINK + "add/cart", {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json; charset=UTF-8", },
            body: JSON.stringify({
              productId: id,
              quantity: 1,
              price: 0,
              weight: size
            }),

          }).then((res) =>  {
            if (res.status === 200) {
                toast.success('added to cart', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
            } else {
             
                toast.error('please try again later ', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
            }
          }
        )
            
        } catch (err) {
          toast.error('please try again later ' + err, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          console.log(err);
        }
      }
    return (


        <div className="tcard">
            <Link to={"/product/" + name}>
              <div className="img">
                    <img src={img} alt="" />
              </div>
              
              <div className="cardText">
                <h2>{name}</h2>
              </div>

              <div className="price">
                <p>€ {price}</p>

              </div>

            </Link>

            <div className="button">
            <button id={size} onClick={(e) => addToCart()}className="btn btn-md btn-info" > cart </button>

            </div>
  
        </div>

    )
}

export default List