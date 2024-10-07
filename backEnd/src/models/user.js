const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true, lowercase: true },

    email: {type: String, required: true, unique: true, lowercase: true,

        validate( value ) {
            if( !validator.isEmail( value )) {
                throw new Error( 'Email is invalid' )
            }
        }},

    imgUrl: {url: {type: String, required: true}, imgId: {type: String, required: true} },


    password: {type: String, required: true, minLength: 8,

        validate(value) {
            if( value.toLowerCase().includes('password')) {
                throw new Error('password musn\'t contain password')
            }
        }},

        paymentId: {type: Object,
        },
        
        
    phone: {type:Number, required: true},


    // tokens: [{ token: {type: String, required: true }}],

    // address: {type: String,  },

    // paymentId: {type: String, required: true,
    // },

    createdAt: {type: Date, default: Date.now },

    role: { type: String, enum: ['user', process.env.ADMIN,], default: 'user' }
})




//Generate auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const payload ={
        email: user.email,
        id: user._id.toString(),
        role: user.role,
    }


    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
    // user.tokens = user.tokens.concat({token})
    //  await user.save()
    return token
}

//login in users
// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email })
//     if (!user) {
//         throw new Error('Unable to log in')
//     }
//     const isMatch = await bcrypt.compare(password, user.password)
//     console.log(isMatch)
//     if(!isMatch) {
//         throw new Error('Unable to login')
//     }

//     return user
// }


// userSchema.methods.verifyPassword = async function (password) {
//     const user = this;
//     const isMatch = await bcrypt.compare(password, user.password);
//     return isMatch};

//Hash plain password before saving
// userSchema.pre('save', async function(next) {
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 10)
//     }

//     next()
// })



     
userSchema.pre('save', async function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    await bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});



userSchema.pre('findOneAndUpdate', async function (next) {
    const user = this;
    if (user._update?.$set?.password) {
      user._update.$set.password = await bcrypt.hash(user._update.$set.password, 10);
    }
    next();
  });
     
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
     




const User = mongoose.model('User', userSchema)
module.exports = User