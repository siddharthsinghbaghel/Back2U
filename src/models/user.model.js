import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = mongoose.Schema({

        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
            unique:true,
            index:true,
            trim:true,
            lowercase : true,
        },
        name:{
            type:String,
            required:true,
            trim:true
            
        },
        number:{
            type:String,
            required:true,
            trim:true,
            validate: {
                validator: function (v) {
                    return /^[0-9]{10}$/.test(v); // Example: Validates 10-digit numbers
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        refreshToken:{
            type:String
        }


},{timestamps:true})
 
   userSchema.pre("save",async function (next) {
           if(!this.isModified("password")){
               return next()
           }
           this.password = await bcrypt.hash(this.password,10)
           next()
       })

   userSchema.methods.isPasswordCorrect = async function (password){
            return await  bcrypt.compare(password, this.password) 
          }
    
    
    userSchema.methods.generateAccessToken = function(){
            return jwt.sign(
                 {
                     _id: this._id,
                     email:this.email,
                     username : this.username 
                 },
                 process.env.ACCESS_TOKEN_SECRET,
                 {
                     expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                 }
             )
         
             
         }
         
    userSchema.methods.generateRefreshToken = function(){
             return jwt.sign(
                 {
                     _id: this._id,
                 },
                 process.env.REFRESH_TOKEN_SECRET,
                 {
                     expiresIn: process.env.REFRESH_TOKEN_EXPIRY
                 }
             )
         }

export const User = mongoose.model("User",userSchema)