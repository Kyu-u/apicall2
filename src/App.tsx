import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import SidebarComponent from "./components/SidebarComponent";
import UserActions from "./pages/UserActions";
import PostActions from "./pages/PostActions";
import Posts from "./pages/Posts";
import Comments from "./pages/Comments";
import CommentActions from "./pages/CommentActions";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SidebarComponent />

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserActions />} />
          <Route path="/users/:id/posts" element={<Posts />} />
          <Route path="/users/:id/posts/:postId" element={<PostActions />} />
          <Route path="/users/:id/posts/create" element={<PostActions />} />
          <Route path="/users/create" element={<UserActions />} />
          <Route path="/posts" element={<Posts />} />

          <Route path="/comments" element={<Comments />} />
          <Route path="/comments/:id" element={<CommentActions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
