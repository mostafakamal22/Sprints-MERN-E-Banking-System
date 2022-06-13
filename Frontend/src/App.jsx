import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/users", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return <div className="text-center text-red-900">Home Pgae</div>;
}

export default App;
