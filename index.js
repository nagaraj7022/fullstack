

const bcrypt = require('bcrypt');
const express = require("express")
const cors = require('cors')
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())
const {connection} = require("./configure/confige")
const {UserModel} = require("./models/user.model")
const {postRouter} = require("./routes/post.model")
const {userRouter} = require("./routes/user.route")
const { authenticate } = require("./middleware/auth.middleware");

app.use(cors({
    origin:"*"
}))
app.get("/",(req,res)=>{
    res.json("WELCOME")
})
   
app.use("/user",userRouter)
app.use(authenticate)
app.use("/post", postRouter)



 


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("hogayale connect")
    } catch (error) {
        console.log("error")
        console.log(error)
    } 

})

