/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers the user's account
 *     description: Creates a new user account and subscribes to a membership plan.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               companyName:
 *                 type: string
 *                 example: "Example Corp"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               suiteNo:
 *                 type: string
 *                 example: "Suite 100"
 *               city:
 *                 type: string
 *                 example: "New York"
 *               state:
 *                 type: string
 *                 example: "NY"
 *               zip:
 *                 type: string
 *                 example: "10001"
 *               phone:
 *                 type: string
 *                 example: "(555) 123-4567"
 *               membership:
 *                 type: string
 *                 example: "Gold"
 *               paymentMethodId:
 *                 type: string
 *                 example: "pm_1GqIC8Dh7pD9mX"
 *               priceId:
 *                 type: string
 *                 example: "price_1GqIC8Dh7pD9mX"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   type: object
 *                   description: Details of the newly registered user
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     companyName:
 *                       type: string
 *                       example: "Example Corp"
 *                     address:
 *                       type: string
 *                       example: "123 Main St"
 *                     suiteNo:
 *                       type: string
 *                       example: "Suite 100"
 *                     city:
 *                       type: string
 *                       example: "New York"
 *                     state:
 *                       type: string
 *                       example: "NY"
 *                     zip:
 *                       type: string
 *                       example: "10001"
 *                     phone:
 *                       type: string
 *                       example: "(555) 123-4567"
 *                     membership:
 *                       type: string
 *                       example: "Gold"
 *                     RADSubscriberGUID:
 *                       type: string
 *                       description: Unique CRM account identifier
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *       400:
 *         description: Bad Request - User with this email already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in the user
 *     description: Authenticates the user with email and password, returning a JWT token and user details including the stored application identifier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address (case-insensitive)
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated sessions
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 RADSubscriberGUID:
 *                   type: string
 *                   description: Unique CRM account identifier
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 APPEnum:
 *                   type: string
 *                   description: Application identifier stored for the user, if any
 *                   example: "PoolIQ"
 *                   nullable: true
 *       401:
 *         description: Unauthorized - Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error"
 */

/**
 * @swagger
 * /auth/account:
 *   get:
 *     summary: Retrieves account information, including user details, subscription status, and payment method.
 *     security:
 *       - bearerAuth: []  # Use bearer authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer token_here
 *         description: Bearer token for authentication. Replace `token_here` with the actual token.
 *     responses:
 *       200:
 *         description: Successfully retrieved account information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     phone:
 *                       type: string
 *                       example: "(555) 123-4567"
 *                     companyName:
 *                       type: string
 *                       example: "Example Corp"
 *                     address:
 *                       type: string
 *                       example: "123 Main St"
 *                     city:
 *                       type: string
 *                       example: "New York"
 *                     state:
 *                       type: string
 *                       example: "NY"
 *                     zip:
 *                       type: string
 *                       example: "10001"
 *                     membership:
 *                       type: string
 *                       example: "Gold"
 *                     RADSubscriberGUID:
 *                       type: string
 *                       description: Unique CRM account identifier
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                 subscription:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     current_period_end:
 *                       type: integer
 *                       description: Timestamp for the next billing date
 *                       example: 1648765432
 *                 paymentMethod:
 *                   type: object
 *                   properties:
 *                     card:
 *                       type: object
 *                       properties:
 *                         brand:
 *                           type: string
 *                           example: "visa"
 *                         last4:
 *                           type: string
 *                           example: "4242"
 *                         exp_month:
 *                           type: integer
 *                           example: 12
 *                         exp_year:
 *                           type: integer
 *                           example: 2025
 *       401:
 *         description: Unauthorized or invalid token.
 *       404:
 *         description: User, subscription, or payment method not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /auth/create-user:
 *   post:
 *     summary: Creates a user account for testing
 *     description: Creates a new user account with minimal required information for testing purposes. All fields except firstName, lastName, email, password, and AppEnum are optional.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - AppEnum
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "testuser@example.com"
 *               password:
 *                 type: string
 *                 example: "testpass123"
 *               companyName:
 *                 type: string
 *                 example: "Test Corp"
 *                 nullable: true
 *               address:
 *                 type: string
 *                 example: "456 Test St"
 *                 nullable: true
 *               suiteNo:
 *                 type: string
 *                 example: "Suite 200"
 *                 nullable: true
 *               city:
 *                 type: string
 *                 example: "Boston"
 *                 nullable: true
 *               state:
 *                 type: string
 *                 example: "MA"
 *                 nullable: true
 *               zip:
 *                 type: string
 *                 example: "02108"
 *                 nullable: true
 *               phone:
 *                 type: string
 *                 example: "(555) 987-6543"
 *                 nullable: true
 *               membership:
 *                 type: string
 *                 example: "Silver"
 *                 nullable: true
 *               AppEnum:
 *                 type: string
 *                 description: Optional application identifier
 *                 example: "PoolIQ"
 *                 nullable: true
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 user:
 *                   type: object
 *                   description: Details of the newly created user
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "testuser@example.com"
 *                     companyName:
 *                       type: string
 *                       example: "Test Corp"
 *                       nullable: true
 *                     address:
 *                       type: string
 *                       example: "456 Test St"
 *                       nullable: true
 *                     suiteNo:
 *                       type: string
 *                       example: "Suite 200"
 *                       nullable: true
 *                     city:
 *                       type: string
 *                       example: "Boston"
 *                       nullable: true
 *                     state:
 *                       type: string
 *                       example: "MA"
 *                       nullable: true
 *                     zip:
 *                       type: string
 *                       example: "02108"
 *                       nullable: true
 *                     phone:
 *                       type: string
 *                       example: "(555) 987-6543"
 *                       nullable: true
 *                     membership:
 *                       type: string
 *                       example: "Silver"
 *                       nullable: true
 *                     AppEnum:
 *                       type: string
 *                       description: Application identifier provided in the request
 *                       example: "PoolIQ"
 *                       nullable: true
 *                     RADSubscriberGUID:
 *                       type: string
 *                       description: Unique CRM account identifier
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *       400:
 *         description: Bad Request - Missing required fields or user with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "First name, last name, email, password, and AppEnum are required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create user"
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { CosmosClient } = require('@azure/cosmos');
const { v4: uuidv4 } = require('uuid'); // Add uuid import
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const cosmosClient = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
});

const database = cosmosClient.database(process.env.COSMOS_DATABASE);
const container = database.container(process.env.COSMOS_CONTAINER);

router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  console.log('Original Email:', email);

  try {
    email = email.toLowerCase();
    console.log('Normalized Email:', email);

    const querySpec = {
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email }],
    };

    const { resources: users } = await container.items.query(querySpec).fetchAll();

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        RADSubscriberGUID: user.RADSubscriberGUID,
        
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      token, 
      message: 'Login successful',
      RADSubscriberGUID: user.RADSubscriberGUID,
      APPEnum: user.AppEnum
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization header required' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Bearer token required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

router.get('/account', authenticate, async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ error: 'User information is incomplete or missing' });
    }

    const userId = req.user.userId;
    const { resource: user } = await container.item(userId).read();

    if (!user) {
      return res.status(404).json({ error: 'User not found in database.' });
    }

    if (!user.stripeCustomerId) {
      return res.status(404).json({ error: 'Stripe Customer ID not found for this user.' });
    }

    const customer = await stripe.customers.retrieve(user.stripeCustomerId);
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    if (subscriptions.data.length === 0) {
      return res.status(404).json({ error: 'No subscriptions found for this customer.' });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptions.data[0].id);
    const paymentMethod = await stripe.paymentMethods.retrieve(
      customer.invoice_settings.default_payment_method
    );

    if (!paymentMethod) {
      return res.status(404).json({ error: 'No payment method found for this subscription.' });
    }

    res.status(200).json({
      user: {
        ...user,
        RADSubscriberGUID: user.RADSubscriberGUID
      },
      subscription,
      paymentMethod,
    });
  } catch (error) {
    console.error('Error fetching account information:', error);
    res.status(500).json({ error: 'Failed to fetch account information' });
  }
});

router.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    companyName,
    address,
    suiteNo,
    city,
    state,
    zip,
    phone,
    membership,
    paymentMethodId,
    priceId
  } = req.body;

  try {
    const existingUserQuery = {
      query: 'SELECT * FROM c WHERE c.email = @value',
      parameters: [{ name: '@value', value: email }],
    };
    const { resources: existingUsers } = await container.items.query(existingUserQuery).fetchAll();

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const customer = await stripe.customers.create({
      email: email.toLowerCase(),
      name: `${firstName} ${lastName}`,
      address: {
        line1: address,
        line2: suiteNo,
        city,
        state,
        postal_code: zip,
        country: 'US',
      },
      phone,
    });

    if (paymentMethodId) {
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
      await stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: paymentMethodId }
      });
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const RADSubscriberGUID = uuidv4(); 
console.log('Generated RADSubscriberGUID:', RADSubscriberGUID);
    const { resource: newUser } = await container.items.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      companyName,
      address,
      suiteNo,
      city,
      state,
      zip,
      phone,
      membership,
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      RADSubscriberGUID: RADSubscriberGUID, 
      createdAt: new Date(),
    });

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: {
        ...newUser,
        RADSubscriberGUID: RADSubscriberGUID 
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});


router.post('/create-user', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    companyName, 
    address,     
    suiteNo,    
    city,       
    state,       
    zip,         
    phone,       
    membership,
    AppEnum
  } = req.body;

  // Required Fields
  if (!firstName || !lastName || !email || !password || AppEnum) {
    return res.status(400).json({ message: 'First name, last name, email, and password, and AppEnum are required' });
  }

  try {
    // Check if the user exists
    const existingUserQuery = {
      query: 'SELECT * FROM c WHERE c.email = @value',
      parameters: [{ name: '@value', value: email }],
    };
    const { resources: existingUsers } = await container.items.query(existingUserQuery).fetchAll();

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const RADSubscriberGUID = uuidv4(); 

  
    const { resource: newUser } = await container.items.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      ...(companyName && { companyName }), 
      ...(address && { address }),
      ...(suiteNo && { suiteNo }),
      ...(city && { city }),
      ...(state && { state }),
      ...(zip && { zip }),
      ...(phone && { phone }),
      ...(membership && { membership }),
      RADSubscriberGUID: RADSubscriberGUID,
      AppEnum: AppEnum,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        ...newUser,
        RADSubscriberGUID: RADSubscriberGUID
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;