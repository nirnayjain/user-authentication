const express=require('express')
const router=express.Router();
const User=require('../Models/User')
const Joi=require('@hapi/joi')
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const {registerValidation,loginValidation}=require('../validation')

router.post('/register',async(req,res)=>{
    const {error}=registerValidation(req.body)
    
     if(error) return res.status(400).send(error.details[0].message)
     const emailExist=await User.findOne({email:req.body.email})
     if(emailExist) return res.status(400).send("Email already registered")
     const salt=await bcrypt.genSalt(10)
     const hashedpassword=await bcrypt.hash(req.body.password,salt)

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
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
router.post('/login',async(req,res)=>{
     const {error}=loginValidation(req.body)
    
     if(error) return res.status(400).send(error.details[0].message)
     const user=await User.findOne({email:req.body.email})
     if(!user) return res.status(400).send("Email or password is wrong")
      const validPass=await bcrypt.compare(req.body.password,user.password)
      if(!validPass) return res.status(400).send("Email or password is wrong")

       const token=jwt.sign({_id:user.id},process.env.TOKEN_SECRET)
        res.header('auth_token',token).send(token)

})

module.exports=router;