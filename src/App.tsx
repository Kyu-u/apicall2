import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Users from "./pages/Users";
import UserActions from "./pages/UserActions";
import PostActions from "./pages/PostActions";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserActions />} />
          <Route path="users/:id/posts" element={<Posts />} />
          <Route path="users/:id/posts/:postId" element={<PostActions />} />
          <Route path="users/:id/posts/create" element={<PostActions  />} />
          <Route path="users/create" element={<UserActions />} />
          <Route path="posts" element={<Posts />} />
          {/* <Route path="posts/:id" element={<PostActions  />} /> */}
          {/* <Route path="posts/create" element={<UserActions />} /> */}
          <Route path="comments" element={<Comments />} />



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
