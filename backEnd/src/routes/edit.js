const express = require("express");
const router = new express.Router();
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");
const Product = require("../models/product");
const User = require("../models/user");

const {auth} = require("../middleware/mid")









router.patch("/cart", auth, async (req, res) => {
    const user = req.userId
    const productId = req.body.productId
    const quantity = Number.parseInt(req.body.quantity );
    const sign = req.body.sign



    try {
        const cart = await Cart.findOneAndUpdate({ userId: user });


        if (cart) {
            //---- Check if index exists ----
            const indexFound = cart.products.findIndex(item => item.sizeId == productId);



            //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
            if (indexFound !== -1 && quantity <= 0) {
                cart.products.splice(indexFound, 1);
                if (cart.products.length == 0) {
                    cart.subTotal = 0;
                } else {
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            }
            //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
            else if (indexFound !== -1) {

                if (sign == "add") {
                    cart.products[indexFound].quantity = cart.products[indexFound].quantity + quantity;

                } else if (sign == "minus") {
                    cart.products[indexFound].quantity = cart.products[indexFound].quantity - quantity;

                }{
                    
                }

                cart.products[indexFound].total = cart.products[indexFound].quantity * cart.products[indexFound].price;
                cart.totalCost = cart.products.map(item => item.total).reduce((acc, next) => acc + next);
            }
            //----Check if quantity is greater than 0 then add item to items array ----
            else if (quantity > 0) {
                cart.products.push({

                    quantity: quantity,
                    total: parseInt(cart.products[indexFound].price * quantity)
                })
                cart.totalCost = cart.products.map(item => item.total).reduce((acc, next) => acc + next);
            }
            //----If quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            const data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
        }
        //------------ This creates a new cart and then adds the item to the cart that has been created------------
  
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});





router.patch('/user', auth, async (req, res)=> {

    const user = req.userId
    try {

        const update = {};
        for (const key of Object.keys(req.body)){
            if (req.body[key] !== '') {
                update[key] = req.body[key];
            }
        }
        User.findOneAndUpdate({_id: user}, {$set: update}, {new: true}).then( async (data) => {
                console.log("success");
         
                        return res.status(200).json({
            success: true,
            data: data,
            message: "user edited successfully ✅"
           
        }) 
        })


 
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "User edit failed"
        })
       
   }  
})
























module.exports = router;