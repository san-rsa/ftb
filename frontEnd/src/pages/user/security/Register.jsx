import React, { useState, useEffect } from "react";

import Nav from "../../../components/sub component/Nav"
import { AlertError, Inputs } from "../../../components/sub component/list/Generallist";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import Style from "../../../styles/Security.module.css"
import Footer from "../../../components/sub component/Footer";




const Register = () => {
    const [data, setInputs] = useState({});
    const [img, setFile] = useState({});
    const [submitbtn, setSubmitBtn] = useState(false)
  
    let navigate = useNavigate()

    




    const handleFileChange = (event) => {
      setFile(event.target.files)
    };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }




        const HandleSubmit = async (event) => {
          event.preventDefault();
          setSubmitBtn(!submitbtn)
      
          const formData = new FormData();
        
      
          Array.from(img).forEach(imgs => {
      
            formData.append('img', imgs);
      
        });
      
              formData.append('data',  JSON.stringify(data));
      
      
      
         const api = fetch(process.env.REACT_APP_API_LINK + 'auth/register/', {
          method: 'POST',
          // credentials: "include",
         // headers: {'Content-Type': "application/json", },
          body:   formData
          })
          
          .then((res) => {           
  
             if (res.status == 200) {
  
           
  
            
                  navigate("/login"); 
  
             } else {
              setSubmitBtn(false);
         
             }
  
             return res.json()
          }).then(
            data => {
              console.log(data.message, 'llk')       
  
             
              if (data.success == false) {
                 AlertError(data.message)
  
                 setSubmitBtn(false);
                 
              } else {
                //  navigate("/user"); 
  
              }
            }).catch((e) => {
            console.log(e);
            setSubmitBtn(false)
            AlertError("error try again later")
  
          })
  
  
          
      
      
       
        
        }
    





  


    return (
        <div className={Style.app} >
         <Nav />
<form onSubmit={HandleSubmit}>

            <h1> SIGN UP</h1>

                <div className={Style.inp}>

            <Inputs name="fname" type={"text"} onchange={handleChange} value={data.fname} placeholder={"your first name "} label={"first name"}  disabled={false} required={true} />   
            <Inputs name="lname" type={"text"} onchange={handleChange} value={data.lname} placeholder={"your last name "} label={"last name"}  disabled={false} required={true} />

            <Inputs name="username" type={"text"} onchange={handleChange} value={data.username} placeholder={"username"} label={"username "}  disabled={false} required={true} />
            <Inputs name="email" type={"email"} onchange={handleChange} value={data.email} placeholder={"your email "} label={"email"}  disabled={false} required={true} />

            <Inputs name="phone" type={"number"} onchange={handleChange} value={data.phone} placeholder={"your phone number "} label={"phone number"}  disabled={false} required={true} />

            <Inputs name="password" type={"password"} onchange={handleChange} value={data.password} placeholder={"password "} label={"password"}  disabled={false} required={true} />
       
            <Inputs label={'picture'} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />

                </div>

           
            <button className="login"  type="submit"> Sign up</button> 


            <h3 className={Style.alternate} > Have an account sign in <Link to={"/login"}> here now</Link> </h3>
</form>

<Footer />
            </div>
        

    )
}





export default Register