import Comments from "../../pages/Comments";
import { store } from "../../redux";
import UserEvent from "@testing-library/user-event";
import { findByText, render, screen, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe('Comments Page Test', () => {
  it("onmount test", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Comments />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByText("id labore ex et quam laborum")).toBeInTheDocument();
  });
  it("modal no click test", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Comments />
        </BrowserRouter>
      </Provider>
    );
    const delButton = await screen.findByTestId("delete-button-1");
    UserEvent.click(delButton);
    expect(await screen.findByText("Delete Comment")).toBeInTheDocument();

    const noButton = await screen.findByTestId("no-button");
    UserEvent.click(noButton);
    expect(await screen.findByText("id labore ex et quam laborum")).toBeInTheDocument();

    // expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
  });
  it("modal yes click test", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Comments />
        </BrowserRouter>
      </Provider>
    );
    const delButton = await screen.findByTestId("delete-button-1");
    UserEvent.click(delButton);

    const yesButton = await screen.findByTestId("yes-button");
    UserEvent.click(yesButton);
    expect(screen.queryByText("id labore ex et quam laborum")).not.toBeInTheDocument();
  });

  it('should change to page 2 on paginator button click', async() => {
    render(
      <Provider store={store}>
        <BrowserRouter >
          <Comments/>
        </BrowserRouter>
      </Provider>
    );
    // screen.getByRole('');
    const navigation = await screen.findByRole("navigation");
    screen.debug(navigation);
    const pageTwoButton = await within(navigation).findByText('»');
    userEvent.click(pageTwoButton);
    expect(await screen.findByRole('heading', { name: 'Comments - 50' })).toBeInTheDocument();
    expect(pageTwoButton).toHaveAttribute('aria-current', 'true');
  })
})