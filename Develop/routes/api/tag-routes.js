const router = require('express').Router();
const { Tag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// get one tag by its `id` value
router.get('/tags/:id', async (req, res) => {
  const tagId = req.params.id;

  try {
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// create a new tag
router.post('/tags', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// update one tag by its `id` value
router.put('/tags/:id', async (req, res) => {
  const tagId = req.params.id;

  try {
    const updatedTag = await Tag.update(req.body, {
      where: { id: tagId },
    });

    if (updatedTag[0] === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json(updatedTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// delete one tag by its `id` value
router.delete('/tags/:id', async (req, res) => {
  const tagId = req.params.id;

  try {
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    await Tag.destroy({
      where: {
        id: tagId,
      },
    });

    res.send('Tag deleted');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
