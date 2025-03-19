import React, { useState, useEffect, createContext, useContext  } from "react";
import Nav from "../../../components/sub component/Nav"
import { Link, useNavigate } from "react-router-dom";
import Style from "../../../styles/Security.module.css"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { AlertError, Inputs } from "../../../components/sub component/list/Generallist";



const Login = () => {

    const [data, setInputs] = useState({});
    const [submitbtn, setSubmitBtn] = useState(false)
  

    const navigate = useNavigate();




    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
     

    const HandleSubmit = async (event) => {
      event.preventDefault();
      setSubmitBtn(!submitbtn)
  
      const formData = new FormData();
    


      formData.append('data',  JSON.stringify(data));
  
  
  
     const api = fetch(process.env.REACT_APP_API_LINK + 'auth/login', {
      method: 'POST',
       credentials: "include",
      //  headers: {'Content-Type': "application/json", },
      body:   formData
      })
      
      .then((res) => {           

         if (res.status == 200) {

 
          navigate("/user"); 

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

     
     
    //  .then((res) => {
    //     const { tokenss } = res.json();
    //    // setToken(token);
        
    //     console.log(tokenss, res)    
    //    if (res.status == 200)     {
    //     // navigate("/user"); 
    //    } 
    //     console.log(res.status)
  
    // }).then((info) => {
    //   const { token } = info.json();
    
    //   console.log(token, info)

    
    // })
            //setToken(token);

     

    //  const { tokens } = await api.json();
    // setTokens(tokens);


  
  

      
  //     console.log(token)    
  //     console.log(info)

     
  // }).catch((e) => {
  //     console.log(e);
     
  //   })       
     



 
  
      console.log( data)






      // try {
      //   const response =fetch('http://localhost:8000/login/', {
      //       method: 'POST',
      //       headers: myHeaders,
      //       body: JSON.stringify(data)
      //       })   
      //   setToken(response.data.token);
      //   localStorage.setItem("token", response.data.token);
      //   navigate("/dashboard");
      // } catch (error) {
      //   console.error("Authentication failed:", error);
      //   setToken(null);
      //   localStorage.removeItem("token");
      //   if (error.response && error.response.data) {
      //     setErrorMessage(error.response.data); // Set the error message if present in the error response
      //   } else {
      //     setErrorMessage("An unexpected error occurred. Please try again.");
      //   }}  







      
    


    return (
        <div className={Style.app}>
         <Nav />

            <h1> SIGN IN</h1>

                <form onSubmit={HandleSubmit} >
                    
            <Inputs name="email" type={"text"} onchange={handleChange} value={data.email} placeholder={"your email or username "} label={"email or username"} />
            <Inputs name="password" type={"password"} onchange={handleChange} value={data.password} label={"password"} />

            <button className="login" type="submit"> Log in</button> 

            <h5 className={Style.forgetpass}> can't remember password click:  <Link to={"/forgetpassword"}> forget Password</Link> </h5>


            <h3 className={Style.alternate} > New here you can sign up <Link to={"/register"}> here now</Link> </h3>
                     
               </form>

            </div>
        

    )
}





export default Login