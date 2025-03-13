import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Style from "../../styles/admin/Team.module.css"
import { useParams, Link, useNavigate } from "react-router-dom";
import {  faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { AlertError, Inputs } from "./list/Generallist";




const AdminBanner = ({ event, typeId }) => {
  const [data, setInputs] = useState({})
  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()
        



        useEffect(() => {
          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/banner/" + typeId.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              head:data.head,
              body: data.body,
              img: data.imgUrl?.url, 
              
              
            })
          ); 

          }       

        if (event.add ) {
      setFetch({link: 'admin/add/banner/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/banner/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Banner" : (event.edit) ? "Edit Banner" : "please try again later" ;  
    
    
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }
    
      const handleFileChange = (event) => {
        setFile(event.target.files)
      };



    


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
        
        .then((res) => {            console.log(res.status);

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


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'head'} type={'text'} name={'head'} onchange={handleChange} value={data.head}  placeholder={'headline'} disabled={false} required={true}  />
        <Inputs label={'picture'} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />







        
       <div className={Style.textarea} >


        <label rel="textarea" htmlFor="textarea" >article</label>

        <textarea value={data.body} onChange={handleChange} name="body" placeholder="type your article here"  rows={7}> </textarea>


        </div>



        <button className="submit" type="submit"  disabled={submitbtn}> Submit</button> 

        </form>

    </div>

    )
}




const TeamAdminPlayer = ({teamid, event, typeId }) => {
    const [data, setInputs] = useState({})
    const [img, setFile] = useState({});
    const [submitbtn, setSubmitBtn] = useState(false)
  
    const [fetchs, setFetch] = useState({link: "", method: ""})
  
  
  
    let navigate = useNavigate()
  
  
  
  
          useEffect(() => {
            if (!typeId) {
              fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + teamid)
              .then((res) =>  res.json())
              .then((data) =>  setInputs(values => ({...values, teamid: data.name}))
            );
            }
  
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
                img: data.picture.url, 
                teamid: data.teamId
                
                
              })
            );
            }       
  
          if (event.add ) {
        setFetch({link: 'admin/add/player/', method: 'POST'  })
      } else if (event.edit) {
        setFetch({link: 'admin/edit/player/' + typeId.replaceAll('-',' '), method: 'PATCH'  })
  
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
  
                 setSubmitBtn(false);
                 
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
          <Inputs label={'team'} type={'text'} value={data.teamid} disabled={true} required={true}  />
  
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









const AdminNews = ({event, typeId }) => {
  const [data, setInputs] = useState({})
  const [region, settRegion] = useState([])


  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()





        useEffect(() => {
          fetch(process.env.REACT_APP_API_LINK  + "getall/competition/" )
          .then((res) =>  res.json())
          .then((data) =>  settRegion(data.data))
        

      }, []);



        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/news/" + typeId.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              head:data.head,
              body: data.body,
              region: data.ref_Region[0], 
              img: data?.imgUrl[0]?.url
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/news/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/news/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add News" : (event.edit) ? "Edit News" : "please try again later" ;  
    
    
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

               console.log(data.message);
               
            } else {
                            // navigate("admin"); 

            }
          })


        
        .catch((e) => {
          console.log(e);
          setSubmitBtn(!submitbtn)
          AlertError("error try again later")


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


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'head'} type={'text'} name={'head'} onchange={handleChange} value={data.head}  placeholder={'head'} disabled={false} required={true}  />
        

       <div className={Style.select} >


        <label rel="select" htmlFor="select" >region</label>

          <select id="region" name={"region"} onChange={handleChange} title="region" Value={data.region} > 
          { data.region ? null : <option value={""} > select a region  </option> }


          {region.map((props) => (

                        
        <option key={props._id} name={"region"} value={props.name} > {props.name}  </option>
 


                )   )   }
    


          </select>

        </div>


        <Inputs label={'picture'} type={'file'} name={'picture'} onchange={handleFileChange} value={data.picture}  placeholder={'first name'} disabled={false} required={true}  />





       <div className={Style.textarea} >


        <label rel="textarea" htmlFor="textarea" >article</label>

        <textarea value={data.body} onChange={handleChange} name="body" placeholder="type your article here"  rows={7}> </textarea>


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

        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 

        
        </form>







    </div>

    )
}





const AdminRegion = ({event, typeId }) => {
  const [data, setInputs] = useState({})
  const [region, settRegion] = useState([])


  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()






        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + typeId.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              name:data.name,
              type: data.type,
              img: data?.logo[0]?.url
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/competition/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/competition/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Region" : (event.edit) ? "Edit Region" : "please try again later" ;  
    
    
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
          
                navigate("/user"); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {

           
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
          AlertError("error try again later")


          let msg = "fail"
        })


        
    
    
     
      
      }


      console.log(data.type);


    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'name'} type={'text'} name={'name'} onchange={handleChange} value={data.name}  placeholder={'name'} disabled={false} required={true}  />
        

       <div className={Style.select} >


        <label rel="select" htmlFor="select" >region</label>

          <select id="region" name={"type"} onChange={handleChange} title="type" value={data.type} required > 
          { data.type ?  null : <option value={""} > select type  </option> }
            <option name={"type"} value={"league"} > League  </option>

            <option name={"type"} value={"cup"} > Cup  </option>            


          </select>

        </div>


        <Inputs label={'logo'} type={'file'} name={'logo'} onchange={handleFileChange} value={data.logo}  placeholder={'first name'} disabled={false}  />


        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 



        </form>







    </div>

    )
}



const AdminSubRegion = ({event, typeId }) => {
  const [data, setInputs] = useState({})
  const [region, settRegion] = useState([])


  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()


          useEffect(() => {
          fetch(process.env.REACT_APP_API_LINK  + "getall/competition/" )
          .then((res) =>  res.json())
          .then((data) =>  settRegion(data.data))
        

      }, []);






        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/sub-competition/" + typeId.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              name:data.name,
              region: data.regionId,
              bio: data.bio,
              img: data?.pictures[0]?.url
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/sub-competition/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/sub-competition/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Sub Region" : (event.edit) ? "Edit Sub Region" : "please try again later" ;  
    
    
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
          
                navigate("/user"); 

           } else {
            setSubmitBtn(false);
       
           }

           return res.json()
        }).then(
          data => {

           
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
          AlertError("error try again later")


          let msg = "fail"
        })


        
    
    
     
      
      }


      console.log(data.type);


    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'name'} type={'text'} name={'name'} onchange={handleChange} value={data.name}  placeholder={'name'} disabled={false} required={true}  />
        


           <div className={Style.select} >


        <label rel="select" htmlFor="select" >region</label>

          <select id="region" name={"region"} onChange={handleChange} title="region" value={data.region} required > 
          { data.region ?  null : <option value={""} > select a region  </option> }


          {region.map((props) => (

                        
        <option key={props._id} name={"region"} value={props.name} > {props.name}  </option>
 


                )   )   }
    


          </select>

        </div>









        <Inputs label={'logo'} type={'file'} name={'logo'} onchange={handleFileChange} value={data.logo}  placeholder={'first name'} disabled={false}  />



       <div className={Style.textarea} >


        <label rel="textarea" htmlFor="textarea" >bio</label>

        <textarea value={data.bio} onChange={handleChange} name="bio" placeholder="biography of the area"  rows={7}> </textarea>


        </div>

        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 

        </form>







    </div>

    )
}



const AdminAddTeamToRegion = ({event, regionId, typeId }) => {
  const [data, setInputs] = useState({})
  const [team, setTeam] = useState([])


  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()


          useEffect(() => {
          fetch(process.env.REACT_APP_API_LINK  + "getall/teams" )
          .then((res) =>  res.json())
          .then((data) =>  setTeam(data.data))


          if (!typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + regionId.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              name:data.name,
              competitionId: data.name,
              img: data?.logo[0]?.url
              
              
            })
          );
          }   
        

      }, []);






        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + regionId?.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              name:data.name,
              competitionId: data.name,
              img: data?.logo[0]?.url
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/add-team-to-competition/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/add-team-to-competition/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Team to Region" : (event.edit) ? "Edit Team Region" : "please try again later" ;  
    
    
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }




          console.log(data, );
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    

    
        formData.append('data',  JSON.stringify(data));
    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + fetchs.link, {
        method: fetchs.method,
        // credentials: "include",
       // headers: {'Content-Type': "application/json", },
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
          AlertError("error try again later")


          let msg = "fail"
        })


        
    
    
     
      
      }


      console.log(data.type);


    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>


      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'region Id'} type={'text'} name={'competitionId'} value={data.competitionId} disabled={true} required={true}  />
        


           <div className={Style.select} >


        <label rel="select" htmlFor="select" >team</label>

          <select id="team" name={"team"} onChange={handleChange} title="team" value={data.team} required > 
          { data.team ?  null : <option value={""} > select a team  </option> }


          {team.map((props) => (

                        
        <option key={props._id} name={"team"} value={props.name} > {props.name}  </option>
 


                )   )   }
    


          </select>

        </div>

        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 

        </form>







    </div>

    )
}











const AdminFixture = ({event, regionId, typeId,  }) => {
  const [data, setInputs] = useState({})
  const [teams, setTeam] = useState([])
  const [type, setType] = useState("")
  


  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})





  const groups = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) );

  



  let navigate = useNavigate()


          useEffect(() => {
            if (!typeId) {
              fetch(process.env.REACT_APP_API_LINK  + "getone/competition/" + regionId)
              .then((res) =>  res.json())
              .then((data) => setInputs(values => ({...values, competition: data.name, img: data.logo[0].url, type: data.type})),
               
            );

          }
            if (!typeId) {
              fetch(process.env.REACT_APP_API_LINK  + "getone/fixtures/year/" + regionId )
              .then((res) =>  res.json())
              .then((data) =>  setInputs(values => ({...values, year: data.year, })),
            
            );

          }




            fetch(process.env.REACT_APP_API_LINK  + "getall/teams/" + regionId)
            .then((res) =>  res.json())
            .then((data) =>  setTeam(data.data)
          );
          



  
          }, []);



        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK + "getone/" + regionId + "/fixture/" + typeId   )
            .then((res) =>  res.json())
            .then((data) => setInputs({

              competition: data.info.competition ,
              // img: data?.logo[0]?.match. ,              
              type: data.info.type,
              year: data.info.year ,
              matchday: data.info.matchday ,
              time: data.match.day.time ,
              date: data.match.day.date.slice(0, 10),
              home: data.match.home._id ,
              away: data.match.away._id,
              stage: data.match?.stage ,
              group: data.match?.group ,

              

              
           })             
         

          );
          }   
          
          

        if (event.add ) {
      setFetch({link: 'admin/add/fixture/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/' + regionId +  '/fixture/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Fixture " : (event.edit) ? "Edit Fixture" : "please try again later" ;  
    
    
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

      }
    



          console.log(data );
    


      const HandleSubmit = async (event) => {
        event.preventDefault();
        setSubmitBtn(!submitbtn)
    
        const formData = new FormData();
      
    
    
        formData.append('data',  JSON.stringify(data));
    
    
    
       const api = fetch(process.env.REACT_APP_API_LINK + fetchs.link, {
        method: fetchs.method,
        // credentials: "include",
       // headers: {'Content-Type': "application/json", },
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
          AlertError("error try again later")


          let msg = "fail"
        })


        
    
    
     
      
      }


      console.log(data.type);


    return (            
      <div className={Style.app}>


      <div className={Style.top} >
        <h1 > {h1} </h1>
      </div>



      <div className={Style.pimg} >

{        data.img &&    <img src={data.img } /> }    

      </div>




        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'region Id'} type={'text'} name={'competition'} value={data.competition} disabled={true} required={true}  />        

        <Inputs label={'season '} type={'number'} name={'year'} onchange={handleChange} value={data.year}  placeholder={'season '} disabled={false} required={true}  />
        
        <Inputs label={'matchday '} type={'number'} name={'matchday'} onchange={handleChange} value={data.matchday}  placeholder={'matchday '} disabled={false} required={true}  />

        <Inputs label={'match time '} type={'time'} name={'time'} onchange={handleChange} value={data.time}  placeholder={'time '} disabled={false} required={true}  />

        <Inputs label={'match date'} type={'date'} name={'date'} onchange={handleChange} value={data.date} disabled={false} required={true}  />

       <div className={Style.select} >


        <label rel="select" htmlFor="select" > home team </label>

          <select id="region" name={"home"} onChange={handleChange} title="home" value={data.home} required > 
          { data.home ?  null : <option value={""} > select home team  </option> }

          {teams.map((props) => (

                        
          <option key={props._id} value={props._id} > {props.name}  </option>
 


                )   )   }

          </select>

        </div>


               <div className={Style.select} >


        <label rel="select" htmlFor="select" > away team </label>

          <select id="region" name={"away"} onChange={handleChange} title="away" value={data.away} required > 
          { data.away ?  null : <option value={""} > select away Team  </option> }

          {teams.map((props) => (

                        
          <option key={props._id} value={props._id} > {props.name}  </option>
 


                )   )   }

          </select>

        </div>


        


        { data.type == "cup" &&

           <div className={Style.select} >


        <label rel="select" htmlFor="select" > stage </label>

          <select id="region" name={"stage"} onChange={handleChange} title="stage" value={data.stage} required > 
          { data.stage ?  null : <option value={""} > select stage  </option> }


                        
          <option value={"group"} > group  </option>
          <option value={"knockout"} > knockout  </option>

 



          </select>

        </div>
          
        
        }




                { data.stage == "group" &&

           <div className={Style.select} >


        <label rel="select" htmlFor="select" > group </label>

          <select id="region" name={"group"} onChange={handleChange} title="group" value={data.group} required > 
          { data.group ?  null : <option value={""} > select group  </option> }


                        
          {groups.map((props) => (

                        
          <option key={props} value={props} > {props}  </option>
 


                )   )   }

 



          </select>

        </div>
          
        
        }



        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 



        </form>







    </div>

    )
}




const AdminTeam = ({event, typeId }) => {
  const [data, setInputs] = useState({})
  const [region, settRegion] = useState([])


  const [img, setFile] = useState({});
  const [submitbtn, setSubmitBtn] = useState(false)

  const [fetchs, setFetch] = useState({link: "", method: ""})



  let navigate = useNavigate()





        useEffect(() => {
          fetch(process.env.REACT_APP_API_LINK  + "getall/competition/" )
          .then((res) =>  res.json())
          .then((data) =>  settRegion(data.data))
        

      }, []);



        useEffect(() => {

          if (typeId) {
            fetch(process.env.REACT_APP_API_LINK  + "getone/team/" + typeId?.replaceAll('-',' '))
            .then((res) =>  res.json())
            .then((data) =>  setInputs({
              name:data.name,
              regionId: data?.regionId[0], 
              img: data?.logo[0]?.url
              
              
            })
          );
          }       

        if (event.add ) {
      setFetch({link: 'admin/add/team/', method: 'POST'  })
    } else if (event.edit) {
      setFetch({link: 'admin/edit/team/' + typeId.replaceAll('-',' '), method: 'PATCH'  })

    }

      }, []);
        



    const h1 = (event.add) ? "Add Team" : (event.edit) ? "Edit Team" : "please try again later" ;  
    
    
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

               console.log(data.message);
               
            } else {
                            // navigate("admin"); 

            }
          })


        
        .catch((e) => {
          console.log(e);
          setSubmitBtn(!submitbtn)
          AlertError("error try again later")


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


        <form className={Style.form} onSubmit={HandleSubmit}>

        <Inputs label={'name'} type={'text'} name={'name'} onchange={handleChange} value={data.name}  placeholder={'name'} disabled={false} required={true}  />
        

       <div className={Style.select} >


        <label rel="select" htmlFor="select" >region</label>

          <select id="region" name={"regionId"} onChange={handleChange} title="region" Value={data.regionId} > 
          { data.region ? null : <option value={""} > select a region  </option> }


          {region.map((props) => (

                        
        <option key={props._id} name={"region"} value={props.name} > {props.name}  </option>
 


                )   )   }
    


          </select>

        </div>


        <Inputs label={'picture'} type={'file'} name={'logo'} onchange={handleFileChange} value={data.logo}  placeholder={'logo'} disabled={false} required={data.img ? false  : true}  />


        

        <button className="submit" type="submit" disabled={submitbtn}> Submit</button> 

        
        </form>







    </div>

    )
}

export {TeamAdminPlayer, AdminTeam, AdminNews, AdminBanner, AdminRegion, AdminSubRegion, AdminAddTeamToRegion, AdminFixture}