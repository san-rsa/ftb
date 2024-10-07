const express = require("express");
const router = new express.Router();
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");
const Product = require("../models/product");
const {auth} = require("../middleware/mid");





router.delete("/cart", auth, async (req, res) => {
    const userId = req.userId
    const productId = req.body.productId

    console.log(productId)


     try {
        const cart = await Cart.findOneAndUpdate( {userId: userId}, {$pull: {products: {_id: productId}}});
  
        const newCart = await Cart.findOne( {userId: userId})
        
            if (cart) {
               cart.totalCost = newCart.products.map(item => item.total).reduce((acc, next) => acc + next);

            }
            const data = await cart.save();


        return res.status(200).json(data)

      
        
}catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});
















router.delete("/wishlist", auth, async (req, res) => {
    const userId = req.userId
    const productId = req.body.productId

     try {
        const wishlist = await Wishlist.findOneAndUpdate( {userId: userId}, {$pull: {products: {productId: productId}}});
  
        return res.status(200).json(wishlist)

      
        
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});





router.delete("/wishlists", auth, async (req, res) => {
    const user = req.userId
    const productId = req.body.productId

    try {
        const wishlist = await Wishlist.findOne({ userId: user });
       // let productDetailss = await productById(productId);
        const productDetails = await Product.findOne({ _id: productId });

             if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--If Cart Exists ----


        if (wishlist) {
            //---- Check if index exists ----
            const indexFound = wishlist.products.findIndex(item => item.productId == productId);

        console.log( user, productId, wishlist, "2222" , indexFound, productDetails.name )


            //----Check if quantity is greater than 0 then add item to items array ----
            if (indexFound !== -1 ) {
                wishlist.products.pull({
                    productId: productId,
                    name : productDetails.name,
                })
            }
            //----If quantity of price is 0 throw the error -------
            else {
                return res.status(400).json({
                type: "product added",
                msg: "you have this product in your list"
                })
            }
            const data = await wishlist.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
        }
        //------------ This creates a new cart and then adds the item to the cart that has been created------------
        else {


            const newW = await Wishlist.create({
                userId: user,
                products: [{
                    name: productDetails.name,
                    productId: productId,
                }],
               
              });
        
        
              return res.status(201).send(newW);
            
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
});





module.exports = router;