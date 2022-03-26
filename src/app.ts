import express, { Request, Response } from "express";
import { getUserById } from "./user/user.service";

const app = express();
const PORT = 3000;

app.use(express.json());

// TODO: Move this endpoint into link.controller.ts
// TODO: Write a sign up/sign in endpoint using JWT. Get the user ID from the bearer token rather than as a body param
app.post("/link/generate", (request: Request, response: Response) => {
  try {
    // Ensure user exists
    const userId: string = request.body.userId;
    const user = getUserById(userId);
    if (!user) {
      return response.status(404).json({
        error: "USER_NOT_FOUND",
        errorMessage: `Could not find user with ID ${userId}`,
      });
    }

    return response.send("done");
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
