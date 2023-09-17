
const dataProducts = require("../Module/allData");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const addBlog =  (req, res) => {
  try {
    // const imageBuffer = req.file.buffer; // The binary image data
    const title = req.body.title;
    const date = req.body.date;
    const image_blog = req.body.image_blog
    const details = req.body.details;

    // Assuming dataProducts.query returns a Promise
     dataProducts.query(
      'INSERT INTO blogs (title, date, image_blog, details ) VALUES (?, ?, ? ,?)',
      [title, date,image_blog , details]
    );

    console.log('Blog added successfully');
    res.status(200).json({ message: 'Blog added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editBlog = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { title, date, image_blog , details } = req.body;
    // const imageBuffer = req.file.buffer;

    // Assuming dataProducts.query returns a Promise
    await dataProducts.query(
      'UPDATE blogs SET title = ?, date = ?, image_blog = ? , details = ? WHERE blog_id = ?',
      [title, date,image_blog , details, itemId]
    );

    console.log('Blog updated successfully');
    res.status(200).json({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const itemId = req.params.id;

    
    await dataProducts.query(
      'DELETE FROM blogs WHERE blog_id = ?',
      [itemId]
    );

    console.log('Blog deleted successfully');
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getBlog = (req, res) => {

  const query = 'SELECT  * , TO_BASE64(image_blog) AS image_base64 FROM blogs';
  dataProducts.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
}



const getBlogById = (req, res) => {
  const itemId =  req.params.id ;

  const query = 'SELECT * , TO_BASE64(image_blog) AS image_base64 FROM blogs  WHERE blog_id = ?'

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




module.exports = { addBlog, editBlog, deleteBlog, getBlog, getBlogById };

