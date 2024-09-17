import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import { useEffect, useState } from "react";
import './style/style.css'

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let data = JSON.parse(localStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Login setToken={setToken} />} />
        <Route path={"/signup"} element={<SignUp />} />
        {token ? (
          <Route path={"/homepage"} element={<HomePage token={token} />} />
        ) : (
          ""
        )}
      </Routes>
    </div>
  );
}

export default App;
