import express, { Request, Response, Router, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "./services/UserService";

const app = express();
app.use(express.json());

const SECRET_KEY = "";
const userService = new UserService();

const router = express.Router();

const loginHandler: RequestHandler = (req, res) => {
  const { username, role } = req.body;
  if (!username || !role) {
    res.status(400).json({ error: "Username and role are required" });
    return;
  }
  const token = jwt.sign({ username, role }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
};

router.post("/login", loginHandler);

app.use(router);

app.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized: No token provided");

    const user = await userService.getUserInfo(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
});

app.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized: No token provided");

    const response = await userService.deleteUser(parseInt(req.params.id));
    res.json(response);
  } catch (error) {
    res.status(403).json({ error: (error as Error).message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
