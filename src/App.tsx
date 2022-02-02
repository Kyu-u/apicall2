import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Users from "./Users";
import UserActions from "./UserActions";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserActions  />} />
          <Route path="users/create" element={<UserActions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
