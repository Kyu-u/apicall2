import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import UserModal from "../../components/Modal";
import { store } from "../../redux";

describe("Modal Test", () => {
  const mockFunction = jest.fn();

  it("should have 'title' as title", () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserModal
          isOpen={true}
          handleDelete={mockFunction}
          content={<></>}
          title={"title"}
          toggleOpen={mockFunction}
        />
      </Provider>
    );
    // screen.debug();
    expect(getByText("title")).toBeVisible();
  });
  it("Content test", () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserModal
          isOpen={true}
          handleDelete={mockFunction}
          content={<div>abc</div>}
          title={"title"}
          toggleOpen={mockFunction}
        />
      </Provider>
    );
    // screen.debug();
    expect(getByText("abc")).toBeVisible();
  });
  it("should call mockfunction 2 times", () => {
    const mockFunction1 = jest.fn();
    const mockFunction2 = jest.fn();

    render(
      <Provider store={store}>
        <UserModal
          isOpen={true}
          handleDelete={mockFunction1}
          content={<div>abc</div>}
          title={"title"}
          toggleOpen={mockFunction2}
        />
      </Provider>
    );
    userEvent.click(screen.getByText('Yes'));
    expect(mockFunction1).toHaveBeenCalledTimes(1);
    expect(mockFunction2).toHaveBeenCalledTimes(1);


    // screen.debug();
  });
  it("should call mockfunction 2 times", () => {
    const mockFunction1 = jest.fn();
    const mockFunction2 = jest.fn();

    render(
      <Provider store={store}>
        <UserModal
          isOpen={true}
          handleDelete={mockFunction1}
          content={<div>abc</div>}
          title={"title"}
          toggleOpen={mockFunction2}
        />
      </Provider>
    );
    userEvent.click(screen.getByText('Nope'));
    expect(mockFunction2).toHaveBeenCalledTimes(1);


    // screen.debug();
  });
});
