const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define a schema for the data
const wishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
});


// Define a model for the data
const Wish = mongoose.model('Wish', wishSchema); // specify the collection name here
/// GET all wishes
router.get('/wishes', (req, res) => {
  const { isHidden } = req.query;
  const query = isHidden ? { isHidden: true } : {};

  Wish.find(query)
    .exec()
    .then((wishes) => {
      res.send(wishes);
    })
    .catch((err) => {
      console.error('Error al buscar los wishes:', err);
      res.status(500).send('Error interno del servidor');
    });
});

// GET a single wish by ID
router.get('/wishes/:id', (req, res) => {
  Wish.findById(req.params.id)
    .exec()
    .then((wish) => {
      if (!wish) {
        return res.status(404).send('Deseo no encontrado');
      }
      res.send(wish);
    })
    .catch((err) => {
      console.error('Error al buscar el deseo:', err);
      res.status(500).send('Error interno del servidor');
    });
});

// POST a new wish
router.post('/wishes', (req, res) => {
  const newWish = new Wish({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    active: req.body.active,
  });
  newWish
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Deseo creado exitosamente',
        createdWish: result,
      });
    })
    .catch((err) => {
      console.error('Error al guardar el deseo:', err);
      res.status(500).send('Error interno del servidor');
    });
});

// DELETE a wish by ID
router.delete('/wishes/:id', (req, res) => {
  const id = req.params.id;
  Wish.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Deseo eliminado exitosamente',
        id: id,
      });
    })
    .catch((err) => {
      console.error('Error al eliminar el deseo:', err);
      res.status(500).send('Error interno del servidor');
    });
});
// PUT to update a wish by ID
router.put('/wishes/:id', (req, res) => {
  const id = req.params.id;
  Wish.findByIdAndUpdate(id, { $set: req.body })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Deseo actualizado exitosamente',
        id: id,
      });
    })
    .catch((err) => {
      console.error('Error al actualizar el deseo:', err);
      res.status(500).send('Error interno del servidor');
    });
});

module.exports = router;