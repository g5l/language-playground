export function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    console.log(`[LOG] ${propertyKey} called with args:`, args);
    const result = await originalMethod.apply(this, args);
    console.log(`[LOG] ${propertyKey} returned:`, result);
    return result;
  };

  return descriptor;
}
