const mongoose = require('mongoose')
const bookschema = new mongoose.Schema({
     Sno:{
        type: Number,
        required:true,
        unique:true
    },
    BookName:{
        type: String,
        unique:true
    },
    Authorname :{
        type: String
    },
    Dateofpublication :{
        type: Date
    },
    No_of_times_borrowed:{
        type: Number
    },
    No_of_books_in_stock:{
        type: Number
    }
})
module.exports = mongoose.model('Book',bookschema)
