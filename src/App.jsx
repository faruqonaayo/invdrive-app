import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Manage from "./pages/Manage/Manage";

const BASE_URL = "http://localhost:3000";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout isAuth={isAuth} onSetAuth={setIsAuth} />}
        >
          <Route
            index
            element={
              <Home BASE_URL={BASE_URL} isAuth={isAuth} onSetAuth={setIsAuth} />
            }
          />
          <Route
            path="/manage"
            element={
              <Manage
                BASE_URL={BASE_URL}
                isAuth={isAuth}
                onSetAuth={setIsAuth}
              />
            }
          />
          <Route
            path="/auth"
            element={
              <Auth isAuth={isAuth} onSetAuth={setIsAuth} BASE_URL={BASE_URL} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
