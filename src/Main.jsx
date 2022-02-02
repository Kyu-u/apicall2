import React from "react";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(`users`)
  }

  return (
    <div>
      <p>this is main</p>
      <button onClick = { goToPage}>Users</button>
    </div>
  )

}

export default Main