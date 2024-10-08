import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import List  from "../components/sub component/list/List";
import Style from "../styles/News.module.css"
import Nav from "./sub component/Nav"
import Newslist from "./sub component/list/Newslist"

import { useParams, Link } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';




const Description = ({}) => {

    const [product, setproduct] = useState([])
    const [info, setinfo] = useState({})
    const [quan, setquan] = useState(Number(0))
    const [prc, setprc] = useState(Number())
    const [price, setprice] = useState(Number())
    const [weight, setweight] = useState(Number())
    const [wishlist, setwish] = useState()
    const [set, setset] = useState('')
    const [priced, setpriced] = useState(Number())




    
    const link = useParams().id

   


       function wght(event) {
        event.preventDefault() 
        
        console.log(priced, weight)
        
        if (event.target.name == 0) {

            const weight0 = document.getElementById("weight0")
            const weight1 = document.getElementById("weight1")
            const weight2 = document.getElementById("weight2")

            weight0.classList.add(Style.active)
            weight1.classList.remove(Style.active)
            weight2.classList.remove(Style.active)






            setprc(info.size[0].price )
            setquan(1)
            setprice(info.size[0].price )
            setweight(info.size[0]._id)
            setpriced(0)



            
        } else  if (event.target.name == 1) {


            const weight0 = document.getElementById("weight0")
            const weight1 = document.getElementById("weight1")
            const weight2 = document.getElementById("weight2")

            weight0.classList.remove(Style.active)
            weight1.classList.add(Style.active)
            weight2.classList.remove(Style.active)



            setprc(info.size[1].price )
            setquan(1)
            setprice(info.size[1].price )
            setweight(info.size[1]._id)
            setpriced(1)








            
        }        else  if (event.target.name == 2) {

            const weight0 = document.getElementById("weight0")
            const weight1 = document.getElementById("weight1")
            const weight2 = document.getElementById("weight2")


            weight0.classList.remove(Style.active)
            weight1.classList.remove(Style.active)
            weight2.classList.add(Style.active)



            setprc(info.size[2].price )
            setquan(1)
            setprice(info.size[2].price )
            setweight(info.size[2]._id)
            setpriced(2)



        }  

       }



    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/product/"+ link)
            .then((res) =>  res.json())
            .then((data) => setinfo(data));
        }, []);

        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getall/product")
            .then((res) =>  res.json())
            .then((data) => setproduct(data.data));
        }, []);
    
 
    
 function qty(params) {
        setquan(params.target.value);
        setprc(Number(params.target.value) * prc )

        
        if (quan <= 0) {
            setquan(1)
           }
    }


    function add(p) {
        p.preventDefault()
        setquan(prevItems => {
           let no= Number(prevItems) + 1;
           let pr = Number(no)*prc;
           setprice(pr);
          return no;
        });
       }

  

       async function addToCart(e) {
        e.preventDefault()
        try {
          const response = await fetch(process.env.REACT_APP_API_LINK + "add/cart", {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json; charset=UTF-8", },
            body: JSON.stringify({
              productId: info._id,
              quantity: quan,
              weight: weight,
              price: priced
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
        };

        } 
      

     useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK  + "getone/wishlist/" + link, {
            credentials: "include",
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then((res) =>  res.json())
        .then((data) =>  {
            if (data.data == "true") {
                setwish(faX)
                setset("active")
            } else {
                setwish(faHeart)
                setset("false")
            }
        } );
    }, []);
         function wish(e) {
            e.preventDefault()
            const  mood = wishlist.iconName


            if (mood == "heart") {
                fetch(process.env.REACT_APP_API_LINK + "add/wishlist", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({productId: info._id }),
             }).then((res) =>  res.json())
             .then( ()=> setwish(faX))



            } else {
                fetch(process.env.REACT_APP_API_LINK + "del/wishlist", {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({productId: info._id }),
                 }).then((res) =>  res.json())
                 .then( ()=> setwish(faHeart))
            }



       }

    //    useEffect(() => {
    //     fetch(process.env.REACT_APP_API_LINK  + "getone/wishlist/"+ link, {
    //         credentials: "include"}
    //     )
    //     .then((res) =>  res.json())
    //     .then((data) => setinfo(data));
    // }, []);






       function minus(p) {
        p.preventDefault()
        setquan(prevItems => {
           let no= Number(prevItems) - 1;
           let pr = Number(no) * prc;
           setprice(pr);

           if (prevItems <= 1) {
            setquan(1)
           }



          return no;
        });
       }

    return (
        <div>
   
            <Newslist />
        </div>

    )
}





export default Description