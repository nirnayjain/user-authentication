const express=require('express')
const router=express.Router();
const User=require('../Models/User')
const Joi=require('@hapi/joi')
const {registerValidation}=require('../validation')

router.post('/register',async(req,res)=>{
    const {error}=registerValidation(req.body)
    
     if(error) return res.status(400).send(error.details[0].message)
     const emailExist=await User.findOne({email:req.body.email})
     if(emailExist) return res.status(400).send("Email already registered")

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    try{
    const savedUser=await user.save()
    res.json(savedUser)
    }
    catch(err){
        res.json({message:err})
        console.log(err)
    }
    
})
router.post('/login',(req,res)=>{
    res.send("Welcome Back")
})

module.exports=router;