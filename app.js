require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { CosmosClient } = require('@azure/cosmos');
const cors = require('cors');
const { specs, swaggerUi } = require('./config/swagger');
require('dotenv').config();

const { findUserByEmail } = require('./config/config');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(cors({
  origin: '*', 
  credentials: true 
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Cosmos Ini1tialization
const cosmosClient = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
});
const database = cosmosClient.database(process.env.COSMOS_DATABASE);
const container = database.container(process.env.COSMOS_CONTAINER);


//Middleware
const verifyJWT = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization header required' });
  }


  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Bearer token required' });
  }

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Registration Route
const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

//Stripe Route
const stripeRoute = require('./routes/stripe');
app.use('/stripe', stripeRoute);


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [
        {
          name: '@email',
          value: email,
        },
      ],
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
      },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});







// app.get('/test-db', async (req, res) => {
//   console.log('mason')
//   try {
//       const { resources } = await container.items.query('SELECT * FROM c').fetchAll();
//       res.status(200).json({ message: 'Connection successful', resources });
//   } catch (error) {
//       console.error('Database connection failed:', error);
//       res.status(500).json({ error: 'Failed to connect to Cosmos DB' });
//   }
// });

// Start Server
const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
