import { render, screen } from "@testing-library/react";
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
    expect(getByText('title')).toBeVisible();
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
    expect(getByText('abc')).toBeVisible();
  });
});
