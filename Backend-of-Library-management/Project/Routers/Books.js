const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Book = require('../model/book')
const user = require('../model/user')
router.get("/",async function(req,res){
    var Books = await Book.find() 
    res.json(Books)
})
router.get("/:Sno",async function(req,res){
   var Books = await Book.findOne({Sno:req.params.Sno});
        res.json(Books)
})
router.get("/:Sno/:field",async function(req,res){
    var field =req.params.field
    var Books = await Book.findOne({Sno:req.params.Sno},{field:1,_id:0});
         res.json(Books)
 })
router.post("/",async function(req,res){
    const book = new Book({
        Sno:req.body.Sno,
        BookName:req.body.BookName,
        Authorname:req.body.Authorname,
        Dateofpublication:req.body.Dateofpublication,
        No_of_times_borrowed:req.body.No_of_times_borrowed,
        No_of_books_in_stock:req.body.No_of_books_in_stock
    })
   await book.save()
   res.json("created")
})
router.patch("/:Sno",async function(req,res){
     await Book.updateOne(
        {Sno:req.params.Sno},
        {$set:req.body}
     )
      res.json("updated")
})
router.delete("/:Sno",async function(req,res){
    await Book.deleteOne({Sno:req.params.Sno})
    res.json("deleted")
})
router.delete("/",async function(req,res){
    await Book.deleteMany()
    res.send('deleted all')
})
router.put("/:Sno",async function(req,res){
    await Book.replaceOne(
        {Sno:req.params.Sno},
        {Sno:req.params.Sno,
         BookName:req.body.BookName,
         Authorname:req.body.Authorname,
         Dateofpublication:req.body.Dateofpublication,
         No_of_times_borrowed:req.body.No_of_times_borrowed,
         No_of_books_in_stock:req.body.No_of_books_in_stock},
        {overwrite:true})
    res.send('overwritten')
})
router.post('/Details',async function(req,res){
       var Books = await Book.find();
       var bg =  Books.map(function(val){
       let BookName = val.BookName;
       return BookName;
       })
       console.log(bg)
       var result=[]
       for(let i=0;i<bg.length;i++)
       {
           console.log(bg[i])
           var bookdetails =await Book.findOne({BookName:bg[i]})
       var userdetails = await user.findOne({BookName:bg[i]});
       console.log("bookdetails: ",bookdetails)
        console.log("Userdetais: ",userdetails)
        if(userdetails)
        {

            result.push({'Detail':i+1},{"Bookdetails":bookdetails},{"userdetails":userdetails})
        }
        else
        {
            result.push({'Detail':i+1},{"Bookdetails":bookdetails},{"userdetails":"Userdetails Not exists"})
        }
}
res.json(result)
})
router.post('/Details/:BookName',async function (req,res){
    var Books = await Book.findMany({BookName:req.params.BookName});
    var bg =  Books.map(function(val){
    let BookName = val.BookName;
    return BookName;
    })
    console.log(bg)
    var result=[]
    for(let i=0;i<bg.length;i++)
    {
        console.log(bg[i])
        var bookdetails =await Book.findOne({BookName:bg[i]})
    var userdetails = await user.findOne({BookName:bg[i]});
    console.log("bookdetails: ",bookdetails)
     console.log("Userdetais: ",userdetails)
     if(userdetails)
     {

         result.push({"Bookdetails":bookdetails},{"userdetails":userdetails})
     }
     else
     {
         result.push({"Bookdetails":bookdetails},{"userdetails":"Userdetails Not exists"})
     }
}
res.json(result)
})
module.exports = router