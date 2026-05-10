import UserCard from "./components/UserCard";
import BookCard from "./components/BookCard";
function App() {
  const users = [
    {
      id: 1,
      name: "Alex Johnson",
      age: 25,
      city: "London",
      email: "alex@mail.com",
      isOnline: true,
    },
    {
      id: 2,
      name: "Sarah Williams",
      age: 22,
      city: "Berlin",
      email: "sarah@mail.com",
      isOnline: false,
    },
    {
      id: 3,
      name: "Tom Brown",
      age: 30,
      city: "Paris",
      email: "tom@mail.com",
      isOnline: true,
    },
    {
      id: 4,
      name: "Kate Davis",
      age: 28,
      city: "Madrid",
      email: "kate@mail.com",
      isOnline: false,
    },
  ];
  const books = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      year: 2008,
      pages: 464,
    },
    {
      id: 2,
      title: "The Pragmatic Programmer",
      author: "Hunt & Thomas",
      year: 1999,
      pages: 352,
    },
    {
      id: 3,
      title: "You Don't Know JS",
      author: "Kyle Simpson",
      year: 2015,
      pages: 278,
    },
  ];
  return (
    <div style={{ paddingLeft: "50px" }}>
      <h2>Lesson 5 - Components & Props</h2>
      <p style={{ fontSize: "17px", color: "#666" }}>
        Practice: JSX, functional components, props, conditional rendering,
        lists
      </p>

      <h2>All Users ({users.length})</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {users.map((user) => {
          return (
            <UserCard
              name={user.name}
              age={user.age}
              city={user.city}
              email={user.email}
              isOnline={user.isOnline}
            />
          );
        })}
      </div>

      <h2>Online Now ({users.filter((u) => u.isOnline).length})</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        {users.filter((u) => u.isOnline).map((user) => {
            return (
              <UserCard
                name={user.name}
                age={user.age}
                city={user.city}
                email={user.email}
                isOnline={user.isOnline}
              />
            );
          })}
      </div>
        <h2>Book List ({books.length})</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        {books.map((book) => {
          return (
            <BookCard
              title={book.title}
              author={book.author}
              year={book.year}
              pages={book.pages}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
