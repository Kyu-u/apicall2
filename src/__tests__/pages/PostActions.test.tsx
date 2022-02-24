import App from "../../App";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('PostAction tests', () => {
  it("should autofill in useractions posts from user with id 1", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter >
          <App/>
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(await screen.findByTestId('info-button-1'));
    // screen.debug();
    userEvent.click(await screen.findByTestId('edit-button-1'));
    expect(await screen.findByDisplayValue(/sunt aut facere/i)).toBeInTheDocument();

  });
  
})