import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from 'react'


import Home from "./pages/Home";
import Codeofconduct from "./pages/Codeofconduct";



import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import ForgetPassword from "./pages/user/Forgetpassword";
import ResetPassword from "./pages/user/Resetpassword";


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


  import 'react-toastify/dist/ReactToastify.css';
  // minified version is also included
  // import 'react-toastify/dist/ReactToastify.min.css';





import "./styles/style.css"
import News from "./pages/News";
import Video from "./pages/Video";
import Team from "./pages/Team";
import Player from "./pages/Player";

import Competitions from "./pages/Competitions";
import Competition from "./pages/Competition";

import Fixtures from "./pages/competition/Fixtures";
import Fixture from "./pages/competition/match/Fixture";


import Results from "./pages/competition/Results";
import Result from "./pages/competition/match/Result";


import Lives from "./pages/competition/Lives";
import Live from "./pages/competition/match/Live";


import Stats from "./pages/competition/Stats";
import Standing from "./pages/competition/Standing";





  

function App() {
 
  return (
 
        <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/video/:id" element={<Video />}/>
        <Route path="/news/:id" element={<News />}/>

        <Route path="/team/:id" element={<Team />}/>
        <Route path="/player/:id" element={<Player />}/>


        <Route path="/regions" element={<Competitions />}/>
        <Route path="/region/:id" element={<Competition />}/>

              {/*
        <Route path="/competition/:id/fixtures" element={<Fixtures />}/>
        <Route path="/competition/:id/fixture/:matchId" element={<Fixture />}/>


        <Route path="/competition/:id/results" element={<Results />}/>
        <Route path="/competition/:id/result/:matchId" element={<Result />}/>


        <Route path="/competition/:id/lives" element={<Lives />}/>
        <Route path="/competition/:id/live/:matchId" element={<Live />}/>


        <Route path="/competition/:id/stats/:type" element={<Stats />}/>
        <Route path="/competition/:id/standing" element={<Standing />}/>
 */}


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
        <Route path="/code-of-conduct" element={<Codeofconduct />} />


        {/* <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
 */}


    </Routes>       

  </BrowserRouter>    
 
  );
}

export default App;