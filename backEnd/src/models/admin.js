const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true, lowercase: true },

    email: {type: String, required: true, unique: true, lowercase: true,

        validate( value ) {
            if( !validator.isEmail( value )) {
                throw new Error( 'Email is invalid' )
            }
        }
    },


    password: {type: String, required: true, minLength: 9, trim: true,

        validate(value) {
            if( value.toLowerCase().includes('password')) {
                throw new Error('password musn\'t contain password')
            }
        }
    },


    tokens: [{ token: {
            type: String,
            required: true
        }
    }],

    createdAt: {type: Date, default: Date.now,
    },
},

{
    timestamps: true
})


//Generate auth token
adminSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
     await user.save()
    return token
}

//login in users
adminSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to log in')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)
    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//Hash plain password before saving
adminSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const Admin = mongoose.model('Admin', userSchema)

module.exports = Admin