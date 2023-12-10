const express = require('express');
const routes = require('./routes');
const { sequelize } = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true }) // Set force to true if you want to drop and recreate tables on every server start
  .then(() => {
    console.log('Sequelize models synced to the database');

    // Start the server
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error('Error syncing Sequelize models:', error);
  });
