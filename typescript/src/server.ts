import express, { Request, Response, Router, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "./services/UserService";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY as string;
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is missing in the environment variables!");
}

const userService = new UserService();

const router = express.Router();

const loginHandler: RequestHandler = (req, res) => {
  const { username, role } = req.body;
  if (!username || !role) {
    res.status(400).json({ error: "Username and role are required" });
    return; 
  }
  const token = jwt.sign({ username, role }, SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json({ token });
};

router.post("/login", loginHandler);

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Unauthorized: No token provided");

    const user = await userService.getUserInfo(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
});

router.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Unauthorized: No token provided");

    const response = await userService.deleteUser(parseInt(req.params.id));
    res.status(200).json(response);
  } catch (error) {
    res.status(403).json({ error: (error as Error).message });
  }
});

app.use(router);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export { app };
