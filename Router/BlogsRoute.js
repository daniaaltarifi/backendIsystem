const express = require('express');
const router = express.Router();
const blogDetails = require("../Controller/BlogsController")
const connection = require("../Module/allData");


router.post('/add' , blogDetails.addBlog);

router.put("/edit/:id" , blogDetails.editBlog);

router.delete("/delete/:id", blogDetails.deleteBlog);



router.get('/data', blogDetails.getBlog)

router.get('/data/:id', blogDetails.getBlogById)


module.exports = router