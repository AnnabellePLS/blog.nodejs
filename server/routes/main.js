const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/**
 * GET /
 * Home Page
 */
router.get("/", async (req, res) => {
    const locals = {
        title: "NodeJS Blog",
        description: "A blog template application that will be used for your own use",
    };

    try {
        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        
        // Calculate prevPage
        const prevPage = parseInt(page) - 1;

        res.render("index", {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            prevPage: prevPage >= 1 ? prevPage : null 
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET /
 * About Page
 */
router.get("/about", (req, res) => {
    const locals = {
        title: "About - NodeJS Blog",
        description: "Learn more about this project.",
    };
    res.render("about", { locals });
});

/**
 * GET /
 * Post :id
 */
router.get("/post/:id", async (req, res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "A blog template application.",
        };

        res.render("post", { locals, data });
    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /
 * Search
 */
router.post("/search", async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "A blog template made with NodeJS and ExpressJS.",
        };

        let perPage = 10;
        let page = req.query.page || 1;

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z ]/g, "");

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
            ],
        });

        const count = data.length;
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        const prevPage = parseInt(page) - 1;

        res.render("index", {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            prevPage: prevPage >= 1 ? prevPage : null 
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;