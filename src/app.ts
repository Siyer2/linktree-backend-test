import express, { Request, Response } from "express";
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
