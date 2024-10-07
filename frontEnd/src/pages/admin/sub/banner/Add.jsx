import React, { useState } from "react";

import Nav from "../../../../components/sub component/Nav"
import Input from "../Inputs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Style from "../../style/Form.module.css"



const Add = ({ }) => {
    const [data, setInputs] = useState({});
    const [img, setFile] = useState({});

    let navigate = useNavigate()


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleFileChange = (event) => {
    setFile(event.target.files)
  };
      console.log(data, img);


  const HandleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
  

    Array.from(img).forEach(imgs => {

      formData.append('img', imgs);

  });

		formData.append('data',  JSON.stringify(data));



   const api = fetch(process.env.REACT_APP_API_LINK + 'admin/add/banner/', {
    method: 'POST',
    credentials: "include",
   // headers: {'Content-Type': "application/json", },
    body:   formData
    })
    
    .then((res) => {
       if (res.status == 200)     {
        navigate("/admin"); 
       } 
        console.log(res)       
    }).then(
      data => console.log(data))
    
    .catch((e) => {
      console.log(e);
      let msg = "fail"
    })


 
  
      console.log(data)
  }
  


    return (
        <div>
         <Nav />

<form>
        <div className="form">

            <h1> ADD</h1>

                <div className={Style.inp}>

            <input type="file"  onChange={handleFileChange} />
            <Input name="text" type={"text"} onchange={handleChange} value={data.text} class={Style.name} label={"name"} />   
                </div>

            <button className="submit" onClick={HandleSubmit}> Submit</button> 

        </div>
</form>
            </div>
        

    )
}





export default Add