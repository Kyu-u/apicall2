import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Users from "./pages/Users";
import UserActions from "./pages/UserActions";
import Posts from "./pages/Posts";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
          <Route path="users/:id" element={<UserActions  />} />
          <Route path="users/create" element={<UserActions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
