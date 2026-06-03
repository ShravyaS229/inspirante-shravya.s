import { useState } from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Student from "./pages/Student";

function App() {
  console.log("insp-riverstone");

  const [user, setUser] = useState(null);

  if (!user) return <Login setUser={setUser} />;

  if (user.role === "admin") return <Admin user={user} />;

  return <Student user={user} />;
}

export default App;