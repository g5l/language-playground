interface User {
  id: string;
  name: string;
  email?: string;
  isActive: boolean;
}

// all properties optional
type MyPartial<T> = { [K in keyof T]?: T[K] };
const u1: MyPartial<User> = { name: "Ana" };

// all properties readonly
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
const u2: MyReadonly<User> = { id: "1", name: "Gabriel", email: "g@gabriel.com", isActive: true };

// add a prefix to property names
type PrefixKeys<T, P extends string> = {
  [K in keyof T as `${P}${Extract<K, string>}`]: T[K]
};
type ApiUser = PrefixKeys<User, "user_">;
const u3: ApiUser = { user_id: "2", user_name: "Cara", user_email: "c@x.com", user_isActive: true };

// keep only boolean-valued properties
type OnlyKeysOfType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K]
};
type UserFlags = OnlyKeysOfType<User, boolean>;
const u4: UserFlags = { isActive: false };

console.log({ u1, u2, u3, u4 });
