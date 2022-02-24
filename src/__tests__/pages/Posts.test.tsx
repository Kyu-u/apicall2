import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { store } from "../../redux";

describe("Testing Post Page", () => {
  it("should display posts from user with id 1", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter >
          <App/>
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(await screen.findByTestId('info-button-1'));
    // screen.debug();
    expect(await screen.findByText(/sunt aut facere/i)).toBeInTheDocument();
  });
  it("should delete post 1 from user with id 1", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter >
          <App/>
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(await screen.findByTestId('info-button-1'));

    expect(await screen.findByText(/sunt aut facere/i)).toBeInTheDocument();

    userEvent.click(await screen.findByTestId('delete-button-1'));
    const yesButton = await screen.findByTestId("yes-button");
    userEvent.click(yesButton);
    // screen.debug();
    expect(screen.queryByText(/sunt aut facere/i)).not.toBeInTheDocument();
  });

});
