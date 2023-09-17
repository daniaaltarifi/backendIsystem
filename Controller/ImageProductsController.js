const dataProducts = require("../Module/allData"); // Import your database connection

// addProduct = async (req, res) => {
//     const {id_product, images_product } = req.body;

//     dataProducts.query(
//         'INSERT INTO product_image ( id_product ,	images_product ) VALUES (?, ?)',
//         [id_product, images_product],
//         (error, results) => {
//             if (error) {
//                 console.error(error);
//                 // Handle the error
//                 res.status(500).json({ error: 'Internal Server Error' });
//             } else {
//                 console.log('Item added successfully');
//                 // You can access the inserted ID using results.insertId
//                 res.status(200).json({ message: 'Item added successfully' });
//             }
//         }
//     );
// }


// addProduct = async (req, res) => {
//   const { id_product, images_product } = req.body;

//   const images = images_product.join(','); // Join the base64 images with commas
//   dataProducts.query(
//     'INSERT INTO product_image (id_product, images_product) VALUES (?, ?)',
//     [id_product, images_product],
//     (error, results) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         console.log('Item added successfully');
//         res.status(200).json({ message: 'Item added successfully' });
//       }
//     }
//   );
// };


addProduct = async (req, res) => {
  const { id_product, images_product } = req.body;

  const images = images_product.split(','); // Split the comma-separated string back into an array
  dataProducts.query(
    'INSERT INTO product_image (id_product, images_product) VALUES (?, ?)',
    [id_product, images], // Use the array of image URLs
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Item added successfully');
        res.status(200).json({ message: 'Item added successfully' });
      }
    }
  );
};



editProduct = async (req, res) => {
    const itemId = req.params.id;
    const {id_product, images_product	} = req.body;
    console.log(itemId);

      if (!id_product || !images_product	) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    dataProducts.query(
        'UPDATE product_image SET id_product = ?, images_product = ? WHERE id_image  = ?',
        [id_product, images_product, itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Item updated successfully');
                res.status(200).json({ message: 'Item updated successfully' });
            }
        }
    );
}


    deleteProduct = async (req, res) => {
        const itemId = req.params.id;
            console.log(itemId);
    
        dataProducts.query(
            'DELETE FROM product_image WHERE id_image = ?',
            [itemId],
            (error, results) => {
                if (error) {
                    console.error(error);
                    // Handle the error
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Item deleted successfully');
                    res.status(200).json({ message: 'Item deleted successfully' });
                }
            }
        );
    }


    const getProduct  = (req, res) => {

        const query = 'SELECT * FROM product_image';
        dataProducts.query(query, (err, results) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          res.json(results);
        });
      }
      


      const getProductById = (req, res) => {
        const itemId =  req.params.id ;
      
        const query = 'SELECT * FROM product_image  WHERE id_image = ?'
      
        dataProducts.query(query ,
        [itemId], (err, results) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          
           console.log(results);
           res.status(200).json({ results });
        });
      }
      

      // const getProductIphone  = (req, res) => {

      //   const query = 'SELECT * FROM product_image WHERE p_category = 10';
      //   dataProducts.query(query, (err, results) => {
      //     if (err) {
      //       console.error('Error executing SQL query:', err);
      //       res.status(500).json({ error: 'Internal server error' });
      //       return;
      //     }
      //     res.json(results);
      //   });
      // }

module.exports = {addProduct , editProduct , deleteProduct ,getProduct , getProductById  }