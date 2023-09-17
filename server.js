//Import Modules
const express = require("express");
const bodyParser = require("body-parser");
const loginRoute = require('./Router/loginRoute');
const signupRoute = require('./Router/SignupRoute');
const ImgProductsRoute = require("./Router/ImgProductsRoute")
const Order = require("./Router/OrderRoute")
const OrderDetails = require("./Router/OrderDetailsRoute")
const categoryDetails = require("./Router/CategoryRoute")
const blogDetails = require("./Router/BlogsRoute")
// const db = require("./Module/allData")
const ProductColors = require("./Router/ProductsColorRoute")
const ProductColorsVariations = require("./Router/ProductColorsVariationsRoute")
const ProductsDetailsRoute = require("./Router/ProductsDetailsRoute")


const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});
const PORT = process.env.PORT ;



const app = express();

app.use(express.json());
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());




// Use the login route
app.use('/login', loginRoute);

// Use the signup route
app.use('/signup', signupRoute);

// Use the product route
app.use('/imgproducts', ImgProductsRoute);

// Use the product details route
app.use('/productdetails', ProductsDetailsRoute);

// Use the order route
app.use('/order', Order);

// Use the order details route
app.use('/orderdetails', OrderDetails);

// Use the category route
app.use('/category', categoryDetails);


// Use the blog route
app.use('/blog', blogDetails);

// Use the color route
app.use('/color', ProductColors);

// Use the color variations route
app.use('/colorvariations', ProductColorsVariations);



app.get('/', (req, res) => {
    res.send('Welcome to the Isystem e-commerce ');
  });


//   app.use((err, req, res, next) => {
//     if (err instanceof SyntaxError) {
//         // Handle JSON parsing error
//         res.status(400).json({ error: 'Invalid JSON' });
//     } else {
//         // Forward other errors to the default Express error handler
//         next(err);
//     }
// });




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


