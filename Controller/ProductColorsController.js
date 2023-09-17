const dataProducts = require("../Module/allData"); // Import your database connection

const addColor = async (req, res) => {
    const { color_name , image_color} = req.body;

    dataProducts.query(
        'INSERT INTO color (color_name , image_color) VALUES (?, ?)',
       
        [color_name	, image_color ],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Item added successfully');
                // You can access the inserted ID using results.insertId
                res.status(200).json({ message: 'Item added successfully' });
            }
        }
    );
}



const editColor = async (req, res) => {
    const itemId = req.params.id;
    const { color_name ,image_color	} = req.body;
    console.log(itemId);

      if (!color_name || !image_color) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    dataProducts.query(
        'UPDATE color SET color_name = ? , image_color	= ? WHERE color_id = ? ',
        [color_name	,image_color, itemId],
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


    deleteColor = async (req, res) => {
        const itemId = req.params.id;
            console.log(itemId);
    
        dataProducts.query(
            'DELETE FROM color WHERE color_id = ?',
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


    const getProductclors  = (req, res) => {

        const query = 'SELECT * FROM color';
        dataProducts.query(query, (err, results) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          res.json(results);
        });
      }
      


      const getProductclorsById = (req, res) => {
        const itemId =  req.params.id ;
      
        const query = 'SELECT * FROM color  WHERE color_id = ?'
      
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
      



module.exports = {addColor , editColor , deleteColor , getProductclors , getProductclorsById }