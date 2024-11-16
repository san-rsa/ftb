import React, { useState, useEffect,  } from "react";
import { Link, useNavigate } from "react-router-dom";
import List  from "../../components/sub component/list/Bannerlist";
import Style from "../../styles/Profile.module.css"
import Nav from "../../components/sub component/Nav"
import Input from "./sub/Inputs";



const Profile = ({ text, img}) => {
    const navigate = useNavigate();


 
    const [order, setorder] = useState([])
    const [product, setproduct] = useState([])
    const [user, setuser] = useState([])
    const [data, setInputs] = useState({});
    const [status, setstatus] = useState("true");

    
    
    function Api() {

        
    
        useEffect(() => {
            
            fetch(process.env.REACT_APP_API_LINK + "getall/wishlist",  {
                method: "GET",
                credentials: "include",
              }) 
            .then((res) =>  res.json())
            .then((data) => setproduct(data.data));
        }, []);
    
        // useEffect(() => {
        //     fetch(process.env.REACT_APP_API_LINK + "getall/order", {
          // method: "GET",
           // credentials: "include",})
        //     .then((res) =>  res.json())
        //     .then((data) => setproduct(data.data));
        // }, []);
    
        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK + "getone/user", {
            method: "GET",
            credentials: "include",
            })
            .then((res) =>  res.json())
            .then((data) =>{ return (setInputs({
                "name": data.name,
                "email": data.email,
                "phone": data.phone,
                "address": data?.address,
                "password": data.password,
            }), setuser(data))});
        }, []);
    }
    
    Api()




console.log(user)





const edit = (e) => {
    e.preventDefault()

    const ed = document.getElementById(Style.edit);
    const sv = document.getElementById(Style.save);
    const pass = document.getElementById(Style.password);


    sv.style.display = 'block';
    ed.style.display = 'none';
    pass.style.display = "block"


    setstatus(!status)
  };

  const save = async (e) => {
    e.preventDefault()

    const api = await fetch(process.env.REACT_APP_API_LINK + 'edit/user/', {
        method: 'PATCH',
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
         })
         
         if (api.status === 200) {
            setuser(data)
        }

    const ed = document.getElementById(Style.edit);
    const sv = document.getElementById(Style.save);
    const pass = document.getElementById(Style.password);


    sv.style.display = 'none';
    ed.style.display = 'block';
    pass.style.display = "none"


    setstatus(!status)
  };


    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

      


    const change = (event) => {
        event.preventDefault()
        const name = event.target.name
        const info = document.getElementById(Style.info);
        const order = document.getElementById(Style.order);
        const wishlist = document.getElementById(Style.wishlist);

        if (event.target.name == "info") {

            info.style.display = 'block';
            order.style.display = 'none';
            wishlist.style.display = 'none';
            
        } else  if (event.target.name == "order") {

            info.style.display = 'none'
            wishlist.style.display = 'none';
            order.style.display = 'block'

            
        } 
        else  if (event.target.name == "wishlist") {

            info.style.display = 'none'
            order.style.display = 'none'
            wishlist.style.display = 'block';

            
        } }

            const logout = async (event) => {
       
           
                const api = await fetch(process.env.REACT_APP_API_LINK + 'auth/logout/', {
                    method: 'GET',
                    credentials: "include",
                    headers: {'Content-Type': 'application/json'},
                     })
                     
                     if (api.status === 200) {
                      navigate("/");
                    } 
                  }
            
       
        //else {
            
        // }

        // info ?  info.style.display = 'flex' :  info.style.display = 'none'



    return (
        <div>
         <Nav />
            <div className={Style.Profile}>


            <div className={Style.section}>

                <div className={Style.left}>
                            <div className={Style.imgD}>
                            <img src={""} alt=""/>
                            <h3> {user?.name}</h3>
                            <br></br>      
                            <br></br>  
                
                                <div className={Style.tabs}>

                                    <div >
                                        <button name="info" onClick={change}> personal information</button>
                                    </div>

                                    <div >
                                        <button name="order" onClick={change}> my order</button>
                                    </div>

                                    <div >
                                        <button name="wishlist" onClick={change}> wishlist</button>
                                    </div>

                                    <div id={Style.logout} >
                                        <button name="log-out" onClick={logout}> log out</button>
                                    </div>

                                </div>
                            
                            </div></div>

        <div className={Style.right}>
            <div className={Style.info} id={Style.info}>
                <h1>PERSONAL INFORMATION</h1>

                <form id={Style.form}>
                <div className={Style.quan}>
                <div className={Style.details}>

                    <div className={Style.name}>
                        <Input name="name" status={status} type={"text"} onchange={handleChange} value={data.name} class={Style.fname} label={"first name"} />   
                    </div>

                    <div className={Style.contact}>
                        <Input name="email" status={status} type={"email"} onchange={handleChange} value={data.email} class={Style.email} label={"email"}   />
                        <Input name="phone" status={status} type={"number"} onchange={handleChange} value={data.phone} class={Style.number} label={"phone number"}  />
                    </div>
                    
                
                    <div className={Style.other}>
                    <Input name="address" status={status}  type={"text"} onchange={handleChange} value={data.address} class={Style.address} label={"address"} />
                    <Input name="password" id={Style.password} status={status} type={"password"} onchange={handleChange} value={data.password} class={Style.password} label={"password"}  />
                    
                    </div>
                </div>
                <button className={Style.cartB} id={Style.edit} onClick={edit}>EDIT</button>
                <button className={Style.cartB} id={Style.save} onClick={save}>SAVE</button>
                </div>
                </form>
            </div>


            <div className={Style.order} id={Style.order}>
                <h1 > MY ORDERS</h1>
    
            </div>

            <div className={Style.wishlist} id={Style.wishlist} >
                <h1 > WISHLIST</h1>


                {product.products?.map((project, id) => (
                    


                    <div className="card"> 
                                        
                    <List
                    key={id}
                    id={product.products[id].productId?._id}
                    price={product.products[id].productId?.size[0].price}
                    name={product.products[id].productId?.name}
                    img={product.products[id].productId?.imgUrl.url}   



                    /> 
    
    
                        </div>
    
    
                    )   )   }

            </div>
 

                <div id={Style.logout2} >
                    <button name="log-out" onClick={logout}> log out</button>
                </div>

            </div>
            </div>

     </div>
        </div>

    )
}





export default Profile