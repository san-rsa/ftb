import React, { useState, useEffect } from "react";
import List  from "./sub/Bannerlist";
import Bannerlist  from "./sub/Bannerlist";
import Categorylist  from "./sub/Categorylist";

import AdminList from "./sub/admin/AdminList"
import UserList from "./sub/UserList"
import Style from "../../styles/Admin.module.css"
import Nav from "../../components/sub component/Nav"
import Input from "./sub/Inputs";
import Search from "./sub/Search";

import { Link, useNavigate } from "react-router-dom";



export function getbanner(setbanner) {
        fetch(process.env.REACT_APP_API_LINK + "getall/banner", {
            method: "GET",
            credentials: "include",
        })
        .then((res) =>  res.json())
        .then((data) => setbanner(data.data));
            };

 export function getcategory(setcategory) { // category vv
        fetch(process.env.REACT_APP_API_LINK + "getall/category",  {
            method: "GET",
            credentials: "include",
          }) 
        .then((res) =>  res.json())
        .then((data) => setcategory(data.data));
        };

export function getproduct(setproduct) { // products tea vv
        fetch(process.env.REACT_APP_API_LINK + "getall/product",  {
            method: "GET",
            credentials: "include",
          }) 
        .then((res) =>  res.json())
        .then((data) => setproduct(data.data));
    };

export function getuser(setuser) { // all user vv
        fetch(process.env.REACT_APP_API_LINK + "getall/user",  {
            method: "GET",
            credentials: "include",
          }) 
        .then((res) =>  res.json())
        .then((data) => setuser(data.data));
    };

export function getadmin(setadmin) {
        fetch(process.env.REACT_APP_API_LINK + "getall/admin", {
      method: "GET",
       credentials: "include",})
        .then((res) =>  res.json())
        .then((data) => setadmin(data.data));
    };

    
 export function getorder(setorder) { 
        fetch(process.env.REACT_APP_API_LINK + "getall/order", {
      method: "GET",
       credentials: "include",})
        .then((res) =>  res.json())
        .then((data) => setorder(data.data));
    };

 export function getoneuser(setInputs, setinfo) { // user one vv
        fetch(process.env.REACT_APP_API_LINK + "getone/user", {
        method: "GET",
        credentials: "include",
        })
        .then((res) =>  res.json())
        .then((data) =>{ return (setInputs({
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "address": data?.address,
            "password": data.password,
        }), setinfo(data))});
    };






const Admin =  () => {
const navigate = useNavigate();

const [admin, setadmin] = useState([])
const [banner, setbanner] = useState([])
const [category, setcategory] = useState([])
const [order, setorder] = useState([])
const [product, setproduct] = useState([])
const [user, setuser] = useState([])


const [data, setInputs] = useState({});
const [info, setinfo] = useState({})



console.log(banner[5]?.imgUrl.url);


 
const [status, setstatus] = useState("true");


useEffect(() => {
            
    getproduct(setproduct)
    getbanner(setbanner)
    getcategory(setcategory)
    getuser(setuser)
    getadmin(setadmin)
    getorder(setorder)
    getoneuser(setInputs, setinfo)
 }, []);

   
  






const logout = async (event) => {
       
           
    const api = await fetch(process.env.REACT_APP_API_LINK + 'auth/logout/', {
        method: 'GET',
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
         })
         
         if (api.status === 200) {
          navigate("/");
        } 
      }




const edit = (e) => { // vvv
    e.preventDefault()

    const ed = document.getElementById(Style.edit);
    const sv = document.getElementById(Style.save);
    const pass = document.getElementById(Style.password);
    sv.style.display = 'block';
    ed.style.display = 'none';
    pass.style.display = "block"


    setstatus(!status)
  };

  const save = async (e) => { // vvv
    e.preventDefault()

    const api = await fetch(process.env.REACT_APP_API_LINK + 'edit/user/', {
        method: 'PATCH',
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
         })
         
         if (api.status === 200) {
            setinfo(data)
        }

    const ed = document.getElementById(Style.edit);
    const sv = document.getElementById(Style.save);
    const pass = document.getElementById(Style.password);


    sv.style.display = 'none';
    ed.style.display = 'block';
    pass.style.display = "none"


    setstatus(!status)
  };



    

     

    const handleChange = (event) => { // input
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }




      


    const change = (event) => { // button switch
        event.preventDefault()
        const name = event.target.name
        const info = document.getElementById(Style.info);
        const order = document.getElementById(Style.order);
        const tea = document.getElementById(Style.tea);
        const admin = document.getElementById(Style.admin);
        const user = document.getElementById(Style.user);
        const banner = document.getElementById(Style.banner);
        const category = document.getElementById(Style.category);

   



        if (event.target.name == "info") {

            info.style.display = 'block';
            order.style.display = 'none';
            tea.style.display = 'none';
            admin.style.display = 'none';
            user.style.display = 'none';
            banner.style.display = 'none';
            category.style.display = 'none';


            
        } else  if (event.target.name == "order") {

            info.style.display = 'none'
            tea.style.display = 'none';
            order.style.display = 'block'
            admin.style.display = 'none';
            user.style.display = 'none';
            banner.style.display = 'none';
            category.style.display = 'none';

            
        }        else  if (event.target.name == "tea") {

            info.style.display = 'none'
            order.style.display = 'none'
            tea.style.display = 'block';
            admin.style.display = 'none';
            user.style.display = 'none';
            banner.style.display = 'none';
            category.style.display = 'none';

        }         else  if (event.target.name == "admin") {

            info.style.display = 'none'
            order.style.display = 'none'
            tea.style.display = 'none';
            admin.style.display = 'block';
            user.style.display = 'none';
            banner.style.display = 'none';
            category.style.display = 'none';

        }         else  if (event.target.name == "user") {

            info.style.display = 'none'
            order.style.display = 'none'
            tea.style.display = 'none';
            admin.style.display = 'none';
            user.style.display = 'block';
            banner.style.display = 'none';
            category.style.display = 'none';

        }  else  if (event.target.name == "banner") {

            info.style.display = 'none'
            order.style.display = 'none'
            tea.style.display = 'none';
            admin.style.display = 'none';
            user.style.display = 'none';
            banner.style.display = 'block';
            category.style.display = 'none';

        }   else  if (event.target.name == "category") {

            info.style.display = 'none'
            order.style.display = 'none'
            tea.style.display = 'none';
            admin.style.display = 'none';
            user.style.display = 'none';
            banner.style.display = 'none';
            category.style.display = 'block';

        }

       
    }


    return (
        <div>
         <Nav />
            <div className={Style.Profile}>


            <div className={Style.section}>

                <div className={Style.left}>
                            <div className={Style.imgD}>
                            <img src={""} alt=""/>
                            <h3> {info.name}</h3>
                            <br></br>      
                            <br></br>  
                
                                <div className={Style.tabs}>

                                    <div >
                                        <button name="info" onClick={change}> personal information</button>
                                    </div>

                                    <div >
                                        <button name="order" onClick={change}> orders</button>
                                    </div>

                                    <div >
                                        <button name="admin" onClick={change}> admins</button>
                                    </div>

                                    <div >
                                        <button name="user" onClick={change}> users</button>
                                    </div>

                                    <div >
                                        <button name="tea" onClick={change}> tea</button>
                                    </div>

                                    <div >
                                        <button name="banner" onClick={change}> banner</button>
                                    </div>

                                    <div >
                                        <button name="category" onClick={change}> category</button>
                                    </div>

                                    
                                    <div id={Style.logout} >
                                        <button name="log-out" onClick={logout}> log out</button>
                                    </div>

                                </div>
                            
                            </div></div>

        <div className={Style.right}>
            <div className={Style.info} id={Style.info}>
                <h1>PERSONAL INFORMATION</h1>
                <form id={Style.form}>
                <div className={Style.quan}>
                <div className={Style.details}>

                    <div className={Style.name}>
                        <Input name="name" status={status} type={"text"} onchange={handleChange} value={data.name} class={Style.fname} label={"name"} />   
                    </div>

                    <div className={Style.contact}>
                        <Input name="email" status={status} type={"email"} onchange={handleChange} value={data.email} class={Style.email} label={"email"}   />
                        <Input name="phone" status={status} type={"number"} onchange={handleChange} value={data.phone} class={Style.number} label={"phone number"}  />
                    </div>
                    
                
                    <div className={Style.other}>
                    <Input name="address" status={status}  type={"text"} onchange={handleChange} value={data.address} class={Style.address} label={"address"} />
                    <Input name="password" id={Style.password} status={status} type={"password"} onchange={handleChange} value={data.password} class={Style.password} label={"password"}  />
                    
                    </div>
                </div>
                <button className={Style.cartB} id={Style.edit} onClick={edit}>EDIT</button>
                <button className={Style.cartB} id={Style.save} onClick={save}>SAVE</button>
                </div>
                </form>
            </div>


            <div className={Style.order} id={Style.order}>


                <h1 > ORDERS</h1>

            <div className={Style.search} >
                <Search name="order" type={"text"} onchange={handleChange} value={data.order} class={Style.order} /> 
                <button><Link to={"search"}> search</Link> </button> 
            </div>

            </div>

            <div className={Style.tea} id={Style.tea} >


            

                <h1 > TEA</h1>

            <div className={Style.search} >
               <Search name="tea" type={"text"} onchange={handleChange} value={data.tea} class={Style.tea} />   

                <button><Link to={"/search"}> search</Link> </button> 
            </div>

                <button className={Style.add}> <Link to={"/admin/addtea"}> ADD NEW</Link> </button>


            {product?.map((data) => (

         
                 <div className="card" key={data._id}> 

                <List
                    price={data.size[0]['price']}
                    id={data.name}
                    name={data.name}
                    img={data.imgUrl[0].url}
                    data={setproduct}
                    />    
                   </div>
              
            

)   )   }

            </div>
 

            <div className={Style.admin} id={Style.admin}>
                <h1 > ADMIN</h1>
                <button className={Style.add}> <Link to={"/admin/addadmin"}> ADD NEW</Link> </button>

                {admin?.map((project) => (

                    <div className="card" key={project._id}> 



                    <AdminList
                        id={project._id}
                        name={project.name}
                        img={project.imgUrl}
                        email={project.email}
                        data={setadmin}
                        data2={setuser}
                        />    
                        </div>


                    )   )   }
            </div>


            <div className={Style.user} id={Style.user}>
                



                <h1 > USER</h1>
           
            <div className={Style.search} >
                <Search name="user" type={"text"} onchange={handleChange} value={data.user} class={Style.user} />   

                <button><Link to={"search"}> search</Link> </button> 
            </div>

                {user.map((project, id) => (

                    <div className="card" key={project._id}> 



                    <UserList
                        id={project._id}
                        name={project.name}
                        img={project.imgUrl}
                        email={project.email}
                        data={setuser}
                        data2={setadmin}
                        />    
                        </div>


                    )   )   }
            </div>

            <div className={Style.banner} id={Style.banner}>
                    <h1> BANNERS</h1>

                    <button className={Style.add}> <Link to={"/admin/addbanner"}> ADD NEW</Link> </button>


                    {banner.map((data) => (

         
                    <div className="card" key={data._id}> 

                    <Bannerlist
                    id={data._id}
                    name={data.head}
                    img={data.imgUrl?.url}
                    data={setbanner}
                    />    
                    </div>



                    )   )   }


            </div>


            <div className={Style.category} id={Style.category}>
                <h1> CATEGORIES</h1>

                <button className={Style.add}> <Link to={"/admin/addcategory"}> ADD NEW</Link> </button>



                {category.map((data) => (

         
                    <div className="card" key={data._id}> 

                    <Categorylist
                    id={data._id}
                    name={data.name}
                    img={data.imgUrl?.url}
                    data={setcategory}
                    />    
                    </div>



                    )   )   }
                </div>




            
            </div>
            </div>

     </div>
        </div>

    )
}





export default Admin