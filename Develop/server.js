const express = require('express');
const { sequelize } = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }) // Set force to true if you want to drop and recreate tables on every server start
  .then(() => {
    console.log('Sequelize models synced to the database');

    // Start the server
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error('Error syncing Sequelize models:', error);
    process.exit(1); // Exit the process if syncing fails
  });
