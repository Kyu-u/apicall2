import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Users from "../../pages/Users";
import { store } from "../../redux";
import UserEvent from "@testing-library/user-event";

describe("Users Page Testing", () => {
  it("onmount test", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Users />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
  });
  it("modal yes click test", async () => {
    const page = render(
      <Provider store={store}>
        <BrowserRouter>
          <Users />
        </BrowserRouter>
      </Provider>
    );
    const delButton = await screen.findByTestId('delete-button-1')
    UserEvent.click(delButton);
    expect(await screen.findByText('Delete User')).toBeInTheDocument();

    const yesButton = await screen.findByTestId('yes-button');
    UserEvent.click(yesButton);
    expect(await screen.findByText('Leanne Graham')).not.toBeInTheDocument();

    // expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();

  })
});
