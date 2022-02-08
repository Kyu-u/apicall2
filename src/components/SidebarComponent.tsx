import React from "react";
import { Menu, Segment, Sidebar, Icon, SidebarProps } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
export default function SidebarComponent() {
  const navigate = useNavigate();
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
    >
      <Menu.Item onClick={() => navigate("/users", { replace: true })} as="a">
        <Icon name="user" />
        Users
      </Menu.Item>
      <Menu.Item
        onClick={() => navigate("/comments", { replace: true })}
        as="a"
      >
        <Icon name="comment" />
        Comments
      </Menu.Item>
    </Sidebar>
  );
}
