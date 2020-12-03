const express = require('express');
const { Like } = require('../models/Like');

const router = express.Router();

router.post('/addlike', (req, res) => {
  const { newLikerId, Items } = req.body;

  if (!newLikerId)
    return res
      .status(400)
      .json({ success: false, errorMessage: 'Found no Customer Id' });
  if (!Items)
    return res
      .status(400)
      .json({ success: false, errorMessage: 'Nothing was ordered' });

  Like.find({ newLikerId: newLikerId }, (err, add) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'Server Error' });
    if (add.length > 0)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'Already Liked the Food' });

    const newLike = new Like(req.body);
    newLike.like = newLike.like + 1;

    newLike.save((err, added) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, errorMessage: 'Error on Adding' });
      if (!added)
        return res
          .status(400)
          .json({ success: false, errorMessage: 'Adding problem' });
      res.json({ success: true, message: 'Added Like', added });
    });
  });
});

router.post('/adddislike', (req, res) => {
  const { newLikerId, Items } = req.body;

  if (!newLikerId)
    return res
      .status(400)
      .json({ success: false, errorMessage: 'Found no Customer Id' });
  if (!Items)
    return res
      .status(400)
      .json({ success: false, errorMessage: 'Nothing was ordered' });

  Like.find({ newLikerId: newLikerId }, (err, add) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'Server Error' });
    if (add.length > 0)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'Already Disliked the Food' });

    const newLike = new Like(req.body);
    newLike.dislike = newLike.dislike + 1;

    newLike.save((err, added) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, errorMessage: 'Error on Adding' });
      if (!added)
        return res
          .status(400)
          .json({ success: false, errorMessage: 'Adding problem' });
      res.json({ success: true, message: 'Added dislike', added });
    });
  });
});

router.get('/all', (req, res) => {
  Like.find((err, like) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'Server Error' });

    if (like.length === 0)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'No like was' });

    res.json({ success: true, message: 'All Like', like });
  });
});

module.exports = router;
