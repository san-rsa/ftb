const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({

    userId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },

    products: [{
      productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
      },

      sizeId: {type: mongoose.Schema.Types.ObjectId, ref: 'size', required: true
      },

      name: {type: String, required: true
      },

      quantity: {type: Number, required: true, min: 1, default: 1
      },

      weight: {type: Number, min: 0, default: 0
      },
      price: {type: Number, default: 0,
      },

      total: {type: Number, default: 0,
      },

      productCode: {type: String,
      },
  }],

      totalCost: {type: Number, default: 0, required: true,
        },
    

      // address: {type: String, required: true,
      // },

       transactionId: {type: String, required: true,
       },

       paymentStatus: {type: String, required: true,
       },

      // createdAt: {type: Date, default: Date.now,
      // },

      // Delivered: {type: Boolean, default: false,
      // },
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order