const { CosmosClient } = require('@azure/cosmos');

const cosmosClient = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
});
const database = cosmosClient.database(process.env.COSMOS_DATABASE);
const container = database.container(process.env.COSMOS_CONTAINER);


const findUserByEmail = async (email) => {
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

    if (users.length > 0) {
      return users[0]; // Return the first matching user
    } else {
      return null; // No user found
    }
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw new Error('Could not fetch user');
  }
};

module.exports = { findUserByEmail };
