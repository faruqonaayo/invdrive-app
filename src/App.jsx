import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Manage from "./pages/Manage/Manage";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/manage" element={<Manage />} />
          <Route
            path="/auth"
            element={<Auth isAuth={isAuth} onSetAuth={setIsAuth} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
