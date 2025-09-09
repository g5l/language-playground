type UserTwo = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: string;
  profile: {
    bio?: string;
    avatarUrl?: string;
    location?: string;
  };
};

type UserListItem = Pick<UserTwo, "id" | "name" | "role">;

type PublicUserDTO = Pick<UserTwo, "id" | "name" | "profile">;

type ProfileEditForm = Pick<User, "id"> & {
  profile: Pick<User["profile"], "bio" | "avatarUrl">;
};

function toUserListItem(u: UserTwo): UserListItem {
  const { id, name, role } = u;
  return { id, name, role };
}

function toPublicUserDTO(u: UserTwo): PublicUserDTO {
  const { id, name, profile } = u;
  return { id, name, profile };
}

const row: UserListItem = toUserListItem(user);

const publicDTO: PublicUserDTO = toPublicUserDTO(user);


console.log({row, publicDTO})


const form: ProfileEditForm = {
  id: user.id,
  profile: {
    bio: "Loves Svelte + React",
    avatarUrl: "https://example.com/new.png"
    // location: "SP" // < Not allowed by type 
  }
};

const updatedForm = applyProfileEdit(user, form);

console.log({updatedForm})