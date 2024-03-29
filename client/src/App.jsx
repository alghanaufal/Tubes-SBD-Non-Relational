import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./component/Nav";
import Home from "./component/Home";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Dashboard from "./component/Dashboard";
import AddBook from "./component/AddBook";
import History from "./component/History";
import Detail from "./component/Detail";
import ForgetPass from "./component/ForgetPass";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/add" element={<AddBook />}></Route>
        <Route path="/history" element={<History />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/forgetpassword" element={<ForgetPass />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
