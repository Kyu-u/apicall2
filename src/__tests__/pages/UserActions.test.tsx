import UserActions from "../../pages/UserActions";
import userEvent from "@testing-library/user-event";
import Users from "../../pages/Users";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux";
import { BrowserRouter, Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "../../App";

describe("Testing User Actions Page", () => {
  it("should open add user on UserActions page", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(await screen.findByTestId("addbutton"));
    // screen.debug();

    expect(
      await screen.findByRole("button", { name: /Submit/i })
    ).toBeInTheDocument();
  });
  it("should add user on submit", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(await screen.findByTestId("addbutton"));
    // screen.debug();
    userEvent.type(screen.getByPlaceholderText("Name"), "john");
    userEvent.type(screen.getByPlaceholderText("Email"), "doe@gmail.com");

    userEvent.click(screen.getByRole("button", { name: /Submit/i }));
    expect(await screen.findByText("john")).toBeInTheDocument();
  });
  it("should autofill UserActions page", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(await screen.findByTestId("edit-button-1"));
    expect(await screen.findByText(/Leanne Graham/i)).toBeInTheDocument();
  });
  it("should update user on Users page", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(await screen.findByTestId("edit-button-1"));
    userEvent.type(await screen.findByDisplayValue(/Leanne Graham/i), "new");
    // screen.debug();
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/Leanne Grahamnew/i)).toBeInTheDocument();
  });
});

describe("Testing UserActions Inputs", () => {
  it("should update textbox value", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(await screen.findByTestId("edit-button-1"));
    userEvent.type(
      await screen.findByDisplayValue(/Leanne Graham/i),
      "{selectall}new"
    );
    expect(screen.getByDisplayValue("new")).toHaveValue("new");
  });
});
