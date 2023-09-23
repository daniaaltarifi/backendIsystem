const express = require('express');
const router = express.Router();
const multer = require('multer');
const dataProducts = require("../Module/allData.js"); // Import your database connection
const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage });

const fs = require('fs');
const path = require('path');


const uploadMultiple = (req, res, next) => {
   
   
    upload.array('image')(req, res, (err) => {
      if (err) {
        console.error('Error uploading images:', err);
        return res.status(500).json({ error: 'Image upload failed' });
      }
      next();
    });
  };


  const addProduct = async (req, res) => {
    const uploadDirectory = ' C:\Users\dania\Desktop\iSystemMain\imagesIsys';
    const imagePaths = [];
  
    for (const file of req.files) {
      const fileName = file.originalname;
      const filePath = path.join(uploadDirectory, fileName);
  
      try {
        await fs.promises.writeFile(filePath, file.buffer);
  
        console.log("Image saved successfully:", filePath);
  
        const imagePath = `/imagesIsys/${fileName}`;
        imagePaths.push(imagePath);
      } catch (error) {
        console.error("Error saving an image:", error);
        return res.status(500).json({ error: "Image upload failed" });
      }
    }
  
    // Insert image paths into the database one by one
    const product_id = req.body.product_id;
    const query = "INSERT INTO product_images (product_id, image_path) VALUES (?, ?)";
  
    try {
      for (const imagePath of imagePaths) {
        await dataProducts.query(query, [product_id, imagePath]);
      }
  
      res.status(200).json({ message: "Images uploaded and saved successfully" });
    } catch (error) {
      console.error("Error inserting image paths into the database:", error);
      return res
        .status(500)
        .json({ error: "Image upload and database update failed" });
    }
  };
  
  

  

router.post('/upload', uploadMultiple,addProduct)



router.get('/images/:product_id', async (req, res) => {
    const product_id = req.params.product_id;
    console.log("Product ID:", product_id); // Add this line for debugging
    
    const query = "SELECT image_path FROM product_images WHERE product_id = ?";
    dataProducts.query(query, [product_id], (error, results) => {
      if (error) {
        console.error("Error executing query:", error); // Log any query execution errors
        return res.status(500).json({ error: "Database query failed" });
      }
    
      console.log("Query results:", results); // Log the query results for debugging
    
      if (results.length === 0) {
        console.log("No results found for product_id:", product_id);
        return res.status(404).json({ error: "No results found for product_id" });
      }
    
  
    try {
    //   const results = await dataProducts.query(query, [product_id]);
      
      if (!Array.isArray(results)) {
        // Handle the case where no results are found
        console.log("No results found for product_id:", product_id);
        res.status(200).json({ status: 'success', images: [] });
        return;
      }
      
      // Extract image paths from the results
      const imagePaths = results.map(result => result.image_path);
  
      // Return the image paths in the response
      res.status(200).json({ status: 'success', images: imagePaths });
    } catch (error) {
      console.error("Error retrieving image paths:", error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve image paths' });
    }
  }) 
})
  

  
  

module.exports = router