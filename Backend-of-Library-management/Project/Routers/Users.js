const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../model/user')
router.get("/",async function(req,res){
    const Users = await User.find() 
    res.json(Users)
})
router.get("/:Reg_no",async function(req,res){
    var Users = await User.findOne({Reg_no:req.params.Reg_no})
        res.json(Users)  
})
router.get("/:Reg_no/:field",async function(req,res){
   var field=req.params.field
    var Users = await User.findOne({Reg_no:req.params.Reg_no},{field:1,_id:0})
        res.json(Users) })
router.post("/",async function(req,res){
    const user = new User({
        Name:req.body.Name,
        Reg_no:req.body.Reg_no,
        Year_of_study:req.body.Year_of_study,
        Book_borrowed_date:req.body.Book_borrowed_date,
        D_day_to_return:req.body. D_day_to_return,
        BookName:req.body.BookName
    })
    await user.save()
   res.json("created")
})
router.patch("/:Reg_no",async function(req,res){
    await User.updateOne(
        {Reg_no:req.params.Reg_no},
        {$set:req.body}
     )
      res.json("updated")
})
router.delete("/:Reg_no",async function(req,res){
    await User.deleteOne({Sno:req.params.Reg_no})
    res.json("deleted")
})
router.delete("/",async function(req,res){
    await User.deleteMany()
    res.send('deleted all')
})
router.put("/:Reg_no",async function(req,res){
    await User.replaceOne(
        {Reg_no:req.params.Reg_no},
        { Name:req.body.Name,
          Reg_no:req.body.Reg_no,
          Year_of_study:req.body.Year_of_study,
          Book_borrowed_date:req.body.Book_borrowed_date,
          D_day_to_return:req.body. D_day_to_return,
          BookName:req.body.BookName},
        {overwrite:true})
    res.send('overwritten')
})
module.exports = router
