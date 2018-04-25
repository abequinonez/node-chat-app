const express = require('express');
const path = require('path');

const app = express();

// Use port 3000 if no environment variable is set
const port = process.env.PORT || 3000;

// Set up the public directory
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
