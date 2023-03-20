const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const passwordValidator = require('password-validator')
const createError = require('http-errors')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'enter your name'],
        maxLength: [30, "Name Cannot exceeds 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        unique:true
    },
    previousPhone: { type: String },
    password: {
        type: String,
        required: [true, 'password field is required'],
        select: false,
    },
    role: {
        type: String,
        default: "user",
        trim: true
    },

    active: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    },

    verificationToken: String,
    expireverificationToken: Date,
},
    {
        timestamps: true
    })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    // check Passwrod strength
    const passwordStrength = new passwordValidator()
    passwordStrength.is()
        .min(6)
        .is().max(20)
        .has().digits()
        .has().letters()
        .has().symbols()

    const isValid = passwordStrength.validate(this.password)
    if (!isValid) return next(createError.NotAcceptable(`password should be atleast 6 char long \n and contains upperCase, LowerCase, symbols`))
    // 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


userSchema.methods.generateToken = function () {
    const getOtp = crypto.randomBytes(10).toString("hex")
    
    this.verificationToken = crypto.createHash("sha256").update(getOtp).digest("hex")
    console.log(this.verificationToken)
    console.log(getOtp)
    this.expireverificationToken = Date.now() + 15 * 60 * 1000
    return getOtp
}

const User = mongoose.model('User', userSchema)

module.exports = User