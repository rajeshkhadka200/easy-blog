// create a new express server ES6

import express from "express";
const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
