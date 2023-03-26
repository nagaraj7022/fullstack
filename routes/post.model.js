const express = require("express")
const postRouter = express.Router()
const {PostModel} = require("../models/post.model")


postRouter.get("/get",async(req,res)=>{
    try {
          const data = await PostModel.find()
    res.json(data)
        
    } catch (error) {
        res.json(error)
    }
  
})

postRouter.get("/getone/:todoID", async (req, res) => {
    try {
          const todoID = req.params.todoID
    const todo = await PostModel.findOne({_id:todoID})
    res.send(todo)
    } catch (error) {
        res.json(error)
    }
  
})
 
postRouter.post("/create",async(req,res)=>{
    const payload = req.body
    try {
        const data = new PostModel(payload)
    await data.save()
    res.send("Data Posted Successfully")
    } catch (error) {
        console.log(Error)
        res.send("error in Post")
    }
})
postRouter.patch("/update/:ID",async(req,res)=>{
    const ID = req.params.ID
    const userID = req.body.userID
    const payload = req.body
    const todo = await PostModel.findOne({_id:ID})
    try {
        if(userID!==todo.userID){
            res.send("You are not Authorized for updating")
        }else{
             const data = await PostModel.findByIdAndUpdate({_id:ID},payload)
            res.send("Data Updated Successfully")
            console.log(data)
        }
       
    } catch (error) {
        console.log(Error)
        res.send("error in patch")
    }
})
postRouter.delete("/delete/:ID", async (req, res) => {
    const ID = req.params.ID
    const userID = req.body.ID
    const todo = await PostModel.findOne({_id:ID})
    if(userID !== todo.userID){
        res.send("Not authorised for Deleting")
    }
    else{
        await PostModel.findByIdAndDelete({_id : todoID})
        res.send({"msg" : "Deleted successfully"})
    }
})





module.exports ={
    postRouter
}