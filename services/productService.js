const Product = require("../models/productModel");

const addProduct = async (
  name,
  color,
  description,
  img,
  price,
  category,
  size,
) => {
  const product = new Product({
    name,
    color,
    description,
    img,
    price : parseInt(price),
    category,
    size
  });

  await product.save();
  return { message: "Product Saved Succefully" };
};

const getProducts = async (filters) => {
  try {
    const { category, color, price, size, rating } = filters;

    let query = {};
    if (category) query.category = category;
    if (color) query.color = color;
    if (size) query.size = size;
    if (rating) query.rating = rating;
    
    // Handle price range filtering
    if (price) {
      const [minPrice, maxPrice] = price.split('-').map(Number);
      query.price = { $gte: minPrice, $lte: maxPrice };
    }

    console.log('Database query:', query);

    const products = await Product.find(query);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// const productById = async (productId) => {
//   const products = await Product.find({ _id: productId });
//   return { message: "success", products };
// };

module.exports = {
  addProduct,
  getProducts,
};
