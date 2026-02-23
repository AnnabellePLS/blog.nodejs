const mongoose = require("mongoose");

const dbPath = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbPath);
        console.log("Mongodb Connected");
    } catch(error){
        console.log(error);
        process.exit(1);
    }
};

const Post = require("../models/Post");

function insertPostData (){
    Post.insertMany([
        {
            title: "Post One",
        body: "This is the first post we will be adding.",
        },
        {
            title:"Post Two",
            body: "This is another post we will be including in our database.",
        },
    ]);
}

insertPostData();

module.exports = connectDB;