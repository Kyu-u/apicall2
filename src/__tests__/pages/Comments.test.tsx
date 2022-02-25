import Comments from "../../pages/Comments";
import { store } from "../../redux";
import UserEvent from "@testing-library/user-event";
import {
  findByText,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { IPaginatorProps } from "../../interfaces";
import Paginator from "../../components/Pagination";

describe("Comments Page Test", () => {
  it("onmount test", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Comments />
        </BrowserRouter>
      </Provider>
    );

    expect(
      await screen.findByText("id labore ex et quam laborum")
    ).toBeInTheDocument();
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
    expect(await screen.findByText("Delete Comment")).toBeVisible();

    const noButton = await screen.findByTestId("no-button");
    UserEvent.click(noButton);
    expect(
      await screen.findByText("id labore ex et quam laborum")
    ).toBeVisible();
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
    expect(
      screen.queryByText("id labore ex et quam laborum")
    ).not.toBeInTheDocument();
  });

  it("should change to page 2 on paginator button click", async () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Comments />
        </BrowserRouter>
      </Provider>
    );

    const navigation = await screen.findByRole("navigation");
    const pageTwoButton = await within(navigation).findByText("2");
    userEvent.click(pageTwoButton);
    
    
    expect(
      await within(await screen.findByRole("navigation")).findByText("2")
    ).toHaveClass("active");
    expect(
      await screen.findByRole("heading", { name: "Comments - 2" })
    ).toBeInTheDocument();

  });
});
