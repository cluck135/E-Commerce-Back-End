const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => { 
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, as: 'products' }]
    });
    if (!categoryData) {
      res.status(400).json({ message: 'no category with that id was found'});
    } 
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(404).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });
    if (!categoryData) {
      res.status(400).json({ message: 'no category with that id was found'});
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
        id: req.body.id,
        category_name: req.body.category_name
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category wiht this id!' });
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({message: 'No category found with that id'});
      return;
    } 
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
