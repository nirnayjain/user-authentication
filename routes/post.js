const router=require('express').Router()
const verify=require('./privateRoute')
router.get("/",verify,(req,res)=>{
    res.send(req.user)
    })

module.exports=router