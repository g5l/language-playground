export function Role(requiredRole: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (user: any, ...args: any[]) {
      if (!user || user.role !== requiredRole) {
        throw new Error("Forbidden: Insufficient permissions");
      }

      return originalMethod.apply(this, [user, ...args]);
    };

    return descriptor;
  };
}
