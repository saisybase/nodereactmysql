import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import "./Pages/Home.css";
import Addedit from "./Pages/Addedit";
import "./Pages/Addedit.css";
import View from "./Pages/View";
import "./Pages/View.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/addcontact" Component={Addedit} />
          <Route exact path="/update/:id" Component={Addedit} />
          <Route exact path="/view/:id" Component={View} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
