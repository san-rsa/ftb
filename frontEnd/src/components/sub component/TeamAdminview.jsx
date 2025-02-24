import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/admin/Team.module.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { AlertError, Inputs } from "./list/Generallist";




const TeamAdminPlayer = ({teamid, event, typeId }) => {
  const [data, setInputs] = useState({})
  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()




        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + teamid)
            .then((res) =>  res.json())
            .then((data) =>  setInputs(values => ({...values, teamid: data.name}))
          );

        }, []);



        useEffect(() => {
          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/player/" + typeId.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              fname:data.name.first,
              lname: data.name.last,
              position: data.position,
              dob: data.dob.slice(0, 10), 
              img: data.picture.url
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/player/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/player/' + typeId, method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Player" : (event.edit) ? "Edit Player" : "please try again later" ;  
    
    
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
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    
        Array.from(img).forEach(imgs => {
    
          formData.append('img', imgs);
    
      });
    
            formData.append('data',  JSON.stringify(data));
    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + fetchs.link, {
        method: fetchs.method,
        // credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {
           if (res.status == 200) {

            const link =teamid.replaceAll(' ','-')

          
                navigate("/team/"+ link + "/"); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               console.log(data.message);
               
            } else {
                            // navigate("admin"); 

            }
          })


        
        .catch((e) => {
          console.log(e);
          setSubmitBtn(!submitbtn)
          toast.error('message', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            })

          let msg = "fail"
        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>


        <div className={Style.form} >

        <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
        <Inputs label={'last name'} type={'text'} name={'lname'} onchange={handleChange} value={data.lname}  placeholder={'last name'} disabled={false} required={true}  />
        <Inputs label={'team'} type={'text'} value={teamid} disabled={true} required={true}  />

        <Inputs label={'date of birth'} type={'date'} name={'dob'} onchange={handleChange} value={data.dob} disabled={false} required={true}  />
        <Inputs label={'picture'} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />


       <div className={Style.select} >


        <label >positions</label>

          <select id="position" name={"position"} onChange={handleChange} title="position" Value={data.position} >

          { data.position ?  <option value={data.position} > {data.position}  </option> : <option value={""} > select a position  </option> }



              <option name={"position"} value={"foward"} > foward  </option>
              <option name={"position"} value={"midfielder"} > midfielder  </option>
              <option name={"position"} value={"defender"} > defender  </option>
              <option name={"position"} value={"goalkeeper"} > goalkeeper  </option>

          </select>

        </div>



        {/* <div className={Style.select} >


        <label >positions</label>

          <select id="position" name={"position"} onChange={handleChange} title="positions" >

              <option name={"position"} value={"foward"} > foward  </option>
              <option name={"position"} value={"midfielder"} > midfielder  </option>
              <option name={"position"} value={"defender"} > defender  </option>
              <option name={"position"} value={"goalkeeper"} > goalkeeper  </option>

          </select>

        </div> */}



        <Inputs label={'shirt number'} type={'text'} name={'snumber'} onchange={handleChange} value={data.snumber} placeholder={'first name'} disabled={false} required={true}  />
        
        {/* <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
        <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
        <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
         */}
        </div>






        <button className="submit" onClick={HandleSubmit} disabled={submitbtn}> Submit</button> 

    </div>

    )
}











const TeamAdminNews = ({teamid, event, typeId }) => {
  const [data, setInputs] = useState({})
  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()




        useEffect(() => {
            fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + teamid)
            .then((res) =>  res.json())
            .then((data) =>  setInputs(values => ({...values, teamid: data.name}))
          );

        }, []);



        useEffect(() => {
          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/news/" + typeId.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              fname:data.name.first,
              lname: data.name.last,
              position: data.position,
              dob: data.dob.slice(0, 10), 
              img: data.picture.url
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/news/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/news/' + typeId, method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Player" : (event.edit) ? "Edit Player" : "please try again later" ;  
    
    
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
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    
        Array.from(img).forEach(imgs => {
    
          formData.append('img', imgs);
    
      });
    
            formData.append('data',  JSON.stringify(data));
    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + fetchs.link, {
        method: fetchs.method,
        // credentials: "include",
       // headers: {'Content-Type': "application/json", },
        body:   formData
        })
        
        .then((res) => {
           if (res.status == 200) {

            const link =teamid.replaceAll(' ','-')

          
                navigate("/team/"+ link + "/"); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {
            console.log(data.message, 'llk')       

           
            if (data.success == false) {
               AlertError(data.message)

               console.log(data.message);
               
            } else {
                            // navigate("admin"); 

            }
          })


        
        .catch((e) => {
          console.log(e);
          setSubmitBtn(!submitbtn)
          toast.error('message', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            })

          let msg = "fail"
        })


        
    
    
     
      
      }



    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>


        <div className={Style.form} >

        <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
        <Inputs label={'last name'} type={'text'} name={'lname'} onchange={handleChange} value={data.lname}  placeholder={'last name'} disabled={false} required={true}  />
        <Inputs label={'team'} type={'text'} value={teamid} disabled={true} required={true}  />

        <Inputs label={'date of birth'} type={'date'} name={'dob'} onchange={handleChange} value={data.dob} disabled={false} required={true}  />
        <Inputs label={'picture'} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />


       <div className={Style.select} >


        <label >positions</label>

          <select id="position" name={"position"} onChange={handleChange} title="position" Value={data.position} >

          { data.position ?  <option value={data.position} > {data.position}  </option> : <option value={""} > select a position  </option> }



              <option name={"position"} value={"foward"} > foward  </option>
              <option name={"position"} value={"midfielder"} > midfielder  </option>
              <option name={"position"} value={"defender"} > defender  </option>
              <option name={"position"} value={"goalkeeper"} > goalkeeper  </option>

          </select>

        </div>



        {/* <div className={Style.select} >


        <label >positions</label>

          <select id="position" name={"position"} onChange={handleChange} title="positions" >

              <option name={"position"} value={"foward"} > foward  </option>
              <option name={"position"} value={"midfielder"} > midfielder  </option>
              <option name={"position"} value={"defender"} > defender  </option>
              <option name={"position"} value={"goalkeeper"} > goalkeeper  </option>

          </select>

        </div> */}



        <Inputs label={'shirt number'} type={'text'} name={'snumber'} onchange={handleChange} value={data.snumber} placeholder={'first name'} disabled={false} required={true}  />
        
        {/* <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
        <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
        <Inputs label={'first name'} type={'text'} name={'fname'} onchange={handleChange} value={data.fname}  placeholder={'first name'} disabled={false} required={true}  />
         */}
        </div>






        <button className="submit" onClick={HandleSubmit} disabled={submitbtn}> Submit</button> 

    </div>

    )
}





export {TeamAdminPlayer, TeamAdminNews}