const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, { model: Tag, through: ProductTag }],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId, {
      include: [Category, { model: Tag, through: ProductTag }],
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.send('Product deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
