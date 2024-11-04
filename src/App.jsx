import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/manage" element={<h1>Manage</h1>} />
          <Route path="/auth" element={<h1>Login</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
