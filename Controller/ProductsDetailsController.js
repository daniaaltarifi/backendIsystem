// const dataProducts = require("../Module/test"); // Import your database connection
const dataProducts = require("../Module/allData"); // Import your database connection
const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});
const IMGPATH = process.env.IMGPATH ;
const multer = require('multer');
const path = require('path');



const addProductDetails = async (req, res) => {
  const {
    product_name,
    color_id,
    stock,
    price,
    image_main,
    image_slider,
    old_price,
    category_id,
  } = req.body;

  //Write the image to the folder using the image path and image name,
  dataProducts.query(
    "INSERT INTO products (product_name ,color_id , stock, price, image_main, image_slider,	old_price, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      product_name,
      color_id,
      stock,
      price,
      image_main,
      image_slider,
      old_price,
      category_id,
    ],
    (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Item added successfully");
        // You can access the inserted ID using results.insertId
        res.status(200).json({ message: "Item added successfully" });
      }
    }
  );
};





// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../images'); 
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + path.extname()); 
//   },
// });

// const upload = multer({ storage: storage });

// addProductDetails = async (req, res) => {
//   // Handle image upload using multer
//   upload.single("image")(req, res, function (err) {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Image upload failed" });
//     }
//     // console.log(req);

//     if (!req.file) {
//       console.error("No file uploaded");
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const {
//       product_name,
//       color_id,
//       stock,
//       price,
//       image_slider,
//       old_price,
//       category_id,
//     } = req.body;

//     // Get the path of the uploaded image
//     const image_main = req.file.path;

//     // Save the image path in the image_main column
//     dataProducts.query(
//       "INSERT INTO products (product_name, color_id, stock, price, image_slider, old_price, category_id, image_main) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//       [
//         product_name,
//         color_id,
//         stock,
//         price,
//         image_slider,
//         old_price,
//         category_id,
//         image_main,
//       ],
//       (error, results) => {
//         if (error) {
//           console.error(error);
//           // Handle the error
//           res.status(500).json({ error: "Internal Server Error" });
//         } else {
//           console.log("Item added successfully");
//           // You can access the inserted ID using results.insertId
//           res.status(200).json({ message: "Item added successfully" });
//         }
//       }
//     );
//   });
// };





const editProductDetails = async (req, res) => {
  const itemId = req.params.id;
  const {
    product_name,
    color_id,
    stock,
    price,
    image_main,
    image_slider,
    old_price,
    category_id,
  } = req.body;
  console.log(itemId);

  if (
    !stock ||
    !color_id ||
    !price ||
    !image_main ||
    !image_slider ||
    !product_name ||
    !old_price
  ) {
    return res
      .status(400)
      .json({ error: "Missing parameters in the request body" });
  }
  console.log("###########################" + category_id);
  dataProducts.query(
    "UPDATE products SET product_name = ? , color_id = ? , stock = ? , price = ?, image_main = ? , image_slider = ?, category_id = ? , old_price = ? WHERE p_id = ?",
    [
      product_name,
      color_id,
      stock,
      price,
      image_main,
      image_slider,
      category_id,
      old_price,
      itemId,
    ],
    (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Item updated successfully");
        res.status(200).json({ message: "Item updated successfully" });
      }
    }
  );
};

const deleteProductDetails = async (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);

  dataProducts.query(
    "DELETE FROM products WHERE p_id = ?",
    [itemId],
    (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Item deleted successfully");
        res.status(200).json({ message: "Item deleted successfully" });
      }
    }
  );
};

const getProductDetails = (req, res) => {
  //Read the image from the folder using the image path and image name saved in database 
  const query =
    "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products";
  dataProducts.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
};

const getProductDetailsById = (req, res) => {
  const productId = req.params.id; // Assuming you're passing the product ID as a parameter in the request URL

  const query = `
    SELECT *
    FROM products 
    WHERE p_id = ?`; // Replace 'id' with the actual name of your product ID column

  dataProducts.query(query, [productId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const product = results[0]; // Assuming there's only one product with the given ID
    res.json(product);
    console.log(productId)
  });
};

const getProductDetailsImacById = (req, res) => {
  const itemId = req.params.id;

  const query =
    "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 3";

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsIphoneById = (req, res) => {
  const itemId = req.params.id;

  const query =
    "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 3";

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsIpadById = (req, res) => {
  const itemId = req.params.id;

  const query =
    "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 4";

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsWatchById = (req, res) => {
  const itemId = req.params.id;

  const query =
    "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 4";

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsAudioById = (req, res) => {
  const itemId = req.params.id;

  const query =
    "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 5";

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsAppleTvById = (req, res) => {
  const itemId = req.params.id;

  const query =
    "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 6";

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

const getProductDetailsAccessoriesTvById = (req, res) => {
  const itemId = req.params.id;

  const query =
    "SELECT * , TO_BASE64(image_main) AS image_base64 FROM products  WHERE category_id = 7";

  dataProducts.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    console.log(results);
    res.status(200).json(results);
  });
};

module.exports = {
  addProductDetails,
  editProductDetails,
  deleteProductDetails,
  getProductDetails,
  getProductDetailsById,
  getProductDetailsIphoneById,
  getProductDetailsImacById,
  getProductDetailsIpadById,
  getProductDetailsWatchById,
  getProductDetailsAudioById,
  getProductDetailsAppleTvById,
  getProductDetailsAccessoriesTvById,
};
