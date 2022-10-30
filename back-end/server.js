const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req,res) => {
    req.setEncoding('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});