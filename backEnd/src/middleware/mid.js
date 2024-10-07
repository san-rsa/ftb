let middlewareObject = {};
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());


const jwt = require('jsonwebtoken')
const User = require('../models/user')
//a middleware to check if a user is logged in or not

const cloudinary = require("../connection/cloudinary");



const auth = (req, res, next) => {
  const token = req.cookies.user;

  if (!token) {
    return res.sendStatus(403).clearCookie("user");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};





const role =  (role)  => async (req, res, next) => {


  try {
    let user= await  User.findOne({_id: req.userId})

    
    if (user.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
   return next();
  } catch (error) {
    console.error('Error authorizing user:', error);
    res.status(500).json({ error: 'An error occurred while authorizing the user' });
  }

  

  // try {
  //   let user= await  User.findOne({_id: req.userId})

    
  //   if (user.role !== role) {
  //     return res.status(403).json({ error: 'Forbidden' });
  //   }
    
  //   next();
  // } catch (error) {
  //   console.error('Error authorizing user:', error);
  //   res.status(500).json({ error: 'An error occurred while authorizing the user' });
  // }
};










module.exports = {  auth, role, };