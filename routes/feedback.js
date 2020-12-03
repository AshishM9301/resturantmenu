const express = require('express');
const { Feedback } = require('../models/Feedback');

const router = express.Router();

router.post('/add', (req, res) => {
  const { feedbackGiverId, feedback, feedbackType } = req.body;

  if (!feedbackGiverId)
    return res
      .status(400)
      .json({ success: false, errorMessage: 'Found no Customer Id' });
  if (!feedback)
    return res
      .status(400)
      .json({ success: false, errorMessage: 'No feedback was found' });
  if (!feedbackType)
    return res
      .status(400)
      .json({ success: false, errorMessage: 'No feedback type was provided' });

  Feedback.find({ feedbackGiverId: feedbackGiverId }, (err, feedbacks) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'Server error' });

    if (feedbacks.length > 0)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'Only one feedback is allowed' });

    const newFeedback = new Feedback(req.body);

    newFeedback.save((err, addedFeedback) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, errorMessage: 'Adding error' });
      if (!addedFeedback)
        return res
          .status(400)
          .json({ success: false, errorMessage: 'Adding problem' });

      res.json({ success: true, message: 'Added feedback', addedFeedback });
    });
  });
});

module.exports = router;
