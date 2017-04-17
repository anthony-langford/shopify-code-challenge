const express    = require('express');
const app        = express();

app.listen(8080, '0.0.0.0', () => {
    console.log('Listening to port: 8080');
});