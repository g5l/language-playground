import request from "supertest";
import { app } from "./server"; // Ensure you export `app` in `server.ts`

describe("Auth and User API", () => {
  let token: string;

  it("should login and return a token", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "testuser", role: "admin" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should fetch user info", async () => {
    const res = await request(app)
      .get("/user/1")
      .set("Authorization", token);

    expect(res.status).toBe(200);
  });

  it("should delete user", async () => {
    const res = await request(app)
      .delete("/user/1")
      .set("Authorization", token);

    expect(res.status).toBe(200);
  });
});
