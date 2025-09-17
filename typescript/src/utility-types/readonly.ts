type Book = {
  id: number;
  title: string;
  author: string;
};

type ReadonlyBook = Readonly<Book>;

const book: ReadonlyBook = {
  id: 1,
  title: "The Pragmatic Programmer",
  author: "Andy Hunt"
};

console.log("Book:", book);

// Error: Cannot assign to 'title' because it is a read-only property
book.title = "Clean Code";

// Allowed: create a new object if you want changes
const updatedBook: ReadonlyBook = {
  ...book,
  title: "Clean Code"
};

console.log("Updated Book:", updatedBook);
