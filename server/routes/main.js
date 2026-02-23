const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//Home Page
router.get("/", async (req, res) => {
   const locals = {
    title: "NodeJS Blog",
    description: "A blog template application that will be used for your own use.",
};

try {
    const data = await Post.find().sort({ createdAt: "desc" });
    res.render("index", { locals, data });
} catch (error) {
}
});

module.exports = router;