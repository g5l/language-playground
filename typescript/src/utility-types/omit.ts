type UserOmit = {
  id: number;
  name: string;
  email: string;
  password: string;
};


type PublicUser = Omit<UserOmit, "password">;

const user: UserOmit = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  password: "supersecret"
};

function getPublicUser(user: UserOmit): PublicUser {
  const { password, ...rest } = user;
  return rest;
}

console.log("Full UserOmit:", user);
console.log("Public UserOmit (without password):", getPublicUser(user));
