import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const navigate = useNavigate();
  const goToPage = (resource) => {
    navigate(resource)
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p>this is main</p>
      <button onClick={() => goToPage('users')}>Users</button>
      <button onClick = { () => goToPage('posts')}>Posts</button>
    </div>
  )

}

export default Main