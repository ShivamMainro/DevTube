const express = require('express');
const { getSubscriptions } = require('@controllers/subscriptionController');
const { isloggedIn } = require('@lib/middlewares');
const router = express.Router();

router.get('/subscriptions', isloggedIn, getSubscriptions);

module.exports = router;
