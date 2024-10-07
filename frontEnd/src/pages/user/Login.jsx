import React, { useState, useEffect, createContext, useContext  } from "react";
import Nav from "../../components/sub component/Nav"
import Input from "./sub/Inputs";
import { Link, useNavigate } from "react-router-dom";
import Style from "../../styles/Login.module.css"
import { ToastContainer, toast, Bounce } from 'react-toastify';



const Login = () => {

    const [data, setInputs] = useState({});

    const navigate = useNavigate();




    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const  handleSubmit = async (event) => {
      event.preventDefault();


   
    const api = await fetch(process.env.REACT_APP_API_LINK + 'auth/login/', {
    method: 'POST',
    credentials: "include",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
     })
     
     if (api.status === 200) {
      navigate("/user");
    } else if (api.status === 403) {
      toast.error('incorrect password or email ', {
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


     console.log(api)
  
  

      
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







      
    }


    return (
        <div>
         <Nav />

<form>
        <div className="form">

            <h1> SIGN IN</h1>

                <div className={Style.inp}>
                    
            <Input name="email" type={"email"} onchange={handleChange} value={data.email} class={Style.email} label={"email"} />
            <Input name="password" type={"password"} onchange={handleChange} value={data.password} class={Style.password} label={"password"} />
                </div>

            <button className="login" onClick={handleSubmit}> Log in</button> 

            <h5 > <Link to={"/forgetpassword"}> forget Password</Link> </h5>


            <h3 > New here you can sign up <Link to={"/register"}> here now</Link> </h3>
        </div>
</form>
            </div>
        

    )
}





export default Login