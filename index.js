const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/dist')));


//subscribe route
// app.post('/',(request, response) => {
// });

const port = process.env.PORT || '8080';
app.listen(port, () => console.log(`Server running on port ${port}`));
