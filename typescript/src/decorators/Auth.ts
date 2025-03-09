import jwt from "jsonwebtoken";

const SECRET_KEY = "your-secret-key";

export function Auth(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (token: string, ...args: any[]) {
    try {
      if (!token) throw new Error("Unauthorized: No token provided");

      const decoded = jwt.verify(token, SECRET_KEY);
      return originalMethod.apply(this, [decoded, ...args]);
    } catch (error) {
      throw new Error("Unauthorized: Invalid token");
    }
  };

  return descriptor;
}
