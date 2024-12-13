const Subscription = require('@models/Subscription');
const Channel = require('@models/Channel');  // Assuming Channel model exists
const mongoose = require('mongoose');


const getSubscriptions = async (req, res) => {
    try {
        const subscriberId = req.user.id;  

        const subscriptions = await Subscription.find({ subscriber: subscriberId })
            .populate({
                path: 'channel',
                select: 'handle logoURL description'  
            });

      
        res.json(subscriptions);  
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ error: 'Failed to fetch subscriptions' });  // Return a 500 error with a message
    }
};

module.exports = {
    getSubscriptions
};
