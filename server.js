const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/routes');
const cacheMiddleware=require('./middleware/middleware.js')

app.use(express.json());
app.use(cacheMiddleware);
app.use(routes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

