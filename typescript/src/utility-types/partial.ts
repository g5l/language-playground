interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

function updateUser(userId: number, userUpdates: Partial<User>): User {
  const existingUser: User = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    isActive: true
  };

  return { ...existingUser, ...userUpdates };
}

const updatedUser = updateUser(1, {
  name: "Jane Doe",
  age: 31
});

console.log("Updated User:", updatedUser);

// custom MyPartial type
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

function updateProduct(productId: string, updates: MyPartial<Product>): Product {
  const existingProduct: Product = {
    id: productId,
    name: "Smartphone",
    price: 999.99,
    description: "Latest model smartphone",
    inStock: true
  };

  return { ...existingProduct, ...updates };
}

const updatedProduct = updateProduct("prod-123", {
  price: 899.99,
  inStock: false
});

console.log("Updated Product:", updatedProduct);
