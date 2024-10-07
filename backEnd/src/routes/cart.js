const express = require("express");
const router = new express.Router();
const Cart = require("../models/cart");
const Product = require("../models/product");




removeProduct = async id => {
    const product = await Product.findByIdAndRemove(id);
    return product
}



const emptyCart = async (req, res) => {
    try {
        let cart = await cart();
        cart.items = [];
        cart.subTotal = 0
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Cart has been emptied",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}




// const Auth = require("../middleware/auth");














router.delete("/empty-cart", emptyCart);
module.exports = router;