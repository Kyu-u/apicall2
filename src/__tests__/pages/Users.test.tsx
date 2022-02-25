import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Users from "../../pages/Users";
import { store } from "../../redux";
import UserEvent from "@testing-library/user-event";

describe("Users Page Testing", () => {


  it("should load users", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Users />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
  });
  it("should not delete selected user", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Users />
        </BrowserRouter>
      </Provider>
    );
    const delButton = await screen.findByTestId("delete-button-1");
    UserEvent.click(delButton);
    expect(await screen.findByText("Delete User")).toBeVisible();

    const noButton = await screen.findByTestId("no-button");
    UserEvent.click(noButton);
    expect(await screen.findByText("Leanne Graham")).toBeVisible();

    // expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
  });
  it("should delete selected user from state", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Users />
        </BrowserRouter>
      </Provider>
    );
    const delButton = await screen.findByTestId("delete-button-1");
    UserEvent.click(delButton);

    const yesButton = await screen.findByTestId("yes-button");
    UserEvent.click(yesButton);
    expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
  });
});
