import React, { useState, useEffect } from "react";

import Nav from "../../../../components/sub component/Nav"
import Input from "../Inputs";
import { Link, useParams, useNavigate } from "react-router-dom";
import Style from "../../style/Form.module.css"



const Edit = () => {
    const [data, setInputs] = useState({});
    const [img, setFile] = useState({});

    const link = useParams().id
    let navigate = useNavigate()



  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleFileChange = (event) => {
     setFile(event.target.files)
   };
      

          useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/banner/"+ link,{
              method: "GET",
              credentials: "include",
              headers: {'Content-Type': 'application/json'},

            }

            )
            .then((res) =>  res.json())
            .then((data) => setInputs({"text": data.text,}));
        }, []);



  const HandleSubmit =  (event) => {
    event.preventDefault();

    const formData = new FormData();
  

    Array.from(img).forEach(imgs => {

      formData.append('img', imgs);

  });

		formData.append('img', img);

		formData.append('data',  JSON.stringify(data));



    fetch(process.env.REACT_APP_API_LINK + 'admin/edit/banner/' + link, {
      method: 'PATCH',
      credentials: "include",    
    body: formData
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

            <h1> Edit</h1>

                <div className={Style.inp}>

                  <div >
                    <img src={data.imgUrl} alt=""/>
                  </div>

                  <input type="file"  onChange={handleFileChange} />
                  <Input name="head" type={"text"} onchange={handleChange} value={data.head} class={Style.name} label={"head"} />   
                  <textarea name="body" value={data.body} className={Style.body} onChange={handleChange} />


                </div>

            <button className="submit" onClick={HandleSubmit}> Submit</button> 

        </div>
</form>
            </div>
        

    )
}





export default Edit