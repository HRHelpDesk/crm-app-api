const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/update-payment-method', async (req, res) => {
    const { paymentMethodId, stripeCustomerId } = req.body;
   console.log(paymentMethodId, stripeCustomerId)
    try {
        if (!paymentMethodId || !stripeCustomerId) {
            return res.status(400).json({ error: 'paymentMethodId and stripeCustomerId are required' });
        }

        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: stripeCustomerId,
        });

        await stripe.customers.update(stripeCustomerId, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

      
        res.json({ message: 'Payment method updated successfully' });
    } catch (error) {
        console.error('Failed to update payment method:', error);
        res.status(500).json({ error: 'Failed to update payment method' });
    }
});

module.exports = router;