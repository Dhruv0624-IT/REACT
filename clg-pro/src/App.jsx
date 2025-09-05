import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Navbar from "./components/Navbar";
import Class from "./screens/Class";

function App() {
  return (
    <div className="app">
      {/* Use BrowserRouter instead of Router */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<><Navbar /><Dashboard /></>} />
          <Route exact path="/class/:id" element={<><Navbar /><Class /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;