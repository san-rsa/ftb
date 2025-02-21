import React, { useState } from "react";

import Nav from "../../../../components/sub component/Nav"
import Input from "../Inputs";
import { Link } from "react-router-dom";
import Style from "../../style/Form.module.css"



const Add = ({ img}) => {
    const [data, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(data);
    console.log(data);
  }


    return (
        <div>
         <Nav />

<form>
        <div className="form">

            <h1> ADD</h1>

                <div className={Style.inp}>

            <Input name="fname" type={"text"} onchange={handleChange} value={data.fname} class={Style.fname} label={"first name"} />   

            <Input name="lname" type={"text"} onchange={handleChange} value={data.lname} class={Style.lname} label={"last name"} />
            
            <Input name="email" type={"email"} onchange={handleChange} value={data.email} class={Style.email} label={"email"} />


            <Input name="password" type={"password"} onchange={handleChange} value={data.password} class={Style.password} label={"password"} />

                </div>

            <button className="submit" onClick={handleSubmit}> Submit</button> 

        </div>
</form>
            </div>
        

    )
}





export default Add