import React, { useState, useEffect } from "react";

import Nav from "../../../components/sub component/Nav"
import { Inputs } from "../../../components/sub component/list/Generallist";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import Style from "../../../styles/Register.module.css"




const Register = ({ img}) => {
    const [data, setInputs] = useState({});
    const [data2, setInputs2] = useState({});
    let navigate = useNavigate()
    let [msg, msg2] = ""

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const HandleSubmit = async (event) => {
    event.preventDefault();

   const api = fetch(process.env.REACT_APP_API_LINK + 'auth/register/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    })
    
    .then((res) => {
       if (res.status == 200)     {
        navigate("/login"); 
       } 
        console.log(res)       
    }).then(
      data => console.log(data))
    
    .catch((e) => {
      console.log(e);
      msg = "fail"
    })


 
  
      console.log(msg, data)
  }

    





  


    return (
        <div>
         <Nav />
<form>
        <div className="form">

            <h1> SIGN UP</h1>

                <div className={Style.inp}>

            <Inputs name="fname" type={"text"} onchange={handleChange} value={data.fname} class={Style.fname} label={"first name"} />   
            <Inputs name="lname" type={"text"} onchange={handleChange} value={data.lname} class={Style.lname} label={"second name"} />
            <Inputs name="email" type={"email"} onchange={handleChange} value={data.email} class={Style.email} label={"email"} />
            <Inputs name="number" type={"number"} onchange={handleChange} value={data.number} class={Style.number} label={"phone number"} />

            <Inputs name="address" type={"text"} onchange={handleChange} value={data.address} class={Style.address} label={"address"} />

            <Inputs name="password" type={"password"} onchange={handleChange} value={data.password} class={Style.password} label={"password"} />
            <Inputs name="imgUrl" type={"text"} onchange={handleChange} value={data.img} class={Style.img} label={"image url address"} />
        

                </div>

           
            <button className="login"  onClick={HandleSubmit}> Sign up</button> 


            <h3 > Have an account sign in <Link to={"/login"}> here now</Link> </h3>
        </div>
</form>
            </div>
        

    )
}





export default Register