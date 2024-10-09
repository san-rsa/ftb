import React, { useState, ReactDOM } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/Nav.module.css"
import {Link, useNavigate} from "react-router-dom"
import { faBars, faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'
import Search from "../../pages/admin/sub/Search";



const Nav = () => {


    const [data, setInputs] = useState({});
    const navigate = useNavigate();


    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }



    const login = async () => {
       
           
    const api = await fetch(process.env.REACT_APP_API_LINK + 'auth/autoLogin/', {
        method: 'GET',
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
         })
         
         if (api.status === 200) {
          navigate("/user");
        } else {
            navigate("/login")
        }
      }







    const [search, setelement] = useState()

    function hide (p){
        const btn = document.getElementById(Style.form)
        const styles = window.getComputedStyle(btn).getPropertyValue("display");

        if (styles == "none") {
            btn.style.display = "block"
        } else if (styles == "block"){
            btn.style.display = "none"        
        }
        console.log(btn);

    }

    return (
        <nav>
        {/* <div className={Style.lnav}>
            <a ><FontAwesomeIcon icon={faBars} size="1x"/> </a> 
        </div> */}
             <Link to={"/"}><h1 id={Style.navh1}>AGBEDIAN LEAGUE</h1></Link>
                   {/* <div className={Style.rnav}>
<Link className={Style.navr}to={"/login"}  onClick={login} ><FontAwesomeIcon icon={faUser}/> </Link>
        
         <Link className={Style.navr} to={"/cart"}><FontAwesomeIcon icon={faCartShopping}/> </Link>

            <form id={Style.form} action="/search">
                <Search name="order" type={"text"} onchange={handleChange} value={data.order} class={Style.order} />  
            </form>



            <button id={Style.search} name="navbtn" onClick={hide}><FontAwesomeIcon icon={faSearch}/> </button>
   
        </div> */}

    </nav>
    )
}

export default Nav