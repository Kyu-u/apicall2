import React from "react";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const navigate = useNavigate();
  const goToPage = (resource: string) => {
    navigate(resource)
  }


  return (
    <div>
      <p>this is main</p>
      <button onClick={() => goToPage('users')}>Users</button>
      <button onClick = { () => goToPage('comments')}>Comments</button>

    </div>
  )

}

export default Main