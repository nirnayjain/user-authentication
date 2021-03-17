const  express=require('express')
const app=express()
const mongoose=require('mongoose')
const route=require('./routes/auth')
require('dotenv/config')
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true });
  app.use(express.json())


app.use('/api/user',route)


const port=process.env.PORT||3000
app.listen(port,()=>console.log('Server Running'))