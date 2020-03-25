const express = require('express');
const app = express();
const geners = require('./routers/genres') ; 

app.use(express.json());
app.use('/api/genres ',geners) ; 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));