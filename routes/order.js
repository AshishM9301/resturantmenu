const express = require('express');
const { Orders } = require('../models/Order');
var router = express.Router();

router.post('/add', (req, res) => {
  const { ordererId, orderItems } = req.body;
  console.log('helo');
  if (!ordererId)
    return res
      .status(400)
      .json({ success: false, errorMessage: "Can't find Ordere ID" });
  if (!orderItems)
    return res
      .status(400)
      .json({ success: false, errorMessage: 'No Items were ordered' });

  Orders.find({ ordererId: ordererId }, (err, order) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'Server Error' });

    const newOrder = new Orders(req.body);

    newOrder.save((err, order) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, errorMessage: 'Server Error', err });
      if (!order)
        return res
          .status(400)
          .json({ success: false, errorMessage: 'Problem in ordering' });
      return res.json({ success: true, message: 'Ordered!!!', order });
    });
  });
});

router.get('/:ordererId', (req, res) => {
  const ordererId = req.params.ordererId;

  Orders.find({ ordererId: ordererId }, (err, orders) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'Server Error' });
    if (orders.length === 0)
      return res
        .status(400)
        .json({ success: false, errorMessage: 'No Order from this Person' });

    res.json({ success: true, message: 'All Order by This Customer', orders });
  });
});

module.exports = router;
