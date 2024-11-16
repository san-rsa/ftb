import Home from "./pages/Home";
import Description from "./pages/Description";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from 'react'

import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import Admin from "./pages/admin/Admin";
import Addtea from "./pages/admin/sub/tea/Add";
import Edittea from "./pages/admin/sub/tea/Edit";
import Addadmin from "./pages/admin/sub/admin/Add";
import Search from "./pages/admin/sub/ResultAdmin";
import Addbanner from "./pages/admin/sub/banner/Add";
import Editbanner from "./pages/admin/sub/banner/Edit";
import Addnews from "./pages/admin/sub/news/Add";
import Editnews from "./pages/admin/sub/news/Edit";
import Addcategory from "./pages/admin/sub/category/Add";
import Editcategory from "./pages/admin/sub/category/Edit";
import ForgetPassword from "./pages/user/Forgetpassword";
import ResetPassword from "./pages/user/Resetpassword";


  import 'react-toastify/dist/ReactToastify.css';
  // minified version is also included
  // import 'react-toastify/dist/ReactToastify.min.css';





import "./styles/style.css"


  

function App() {
 
  return (
 
        <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Description />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/user" element={<Profile />}/>
        <Route path="/admin" element={<Admin />}/>

        
        <Route path="/admin/addtea/" element={<Addtea />}/>
        <Route path="/admin/edittea/:id" element={<Edittea />}/>
        <Route path="/admin/addnews/" element={<Addnews />}/>
        <Route path="/admin/editnews/:id" element={<Editnews />}/>
        <Route path="/admin/addadmin" element={<Addadmin />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/admin/editbanner/:id" element={<Editbanner />}/>
        <Route path="/admin/addbanner" element={<Addbanner />}/>
        <Route path="/admin/editcategory/:id" element={<Editcategory />}/>
        <Route path="/admin/addcategory" element={<Addcategory />}/>
        <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword />} />

   


    </Routes>       

  </BrowserRouter>    
 
  );
}

export default App;