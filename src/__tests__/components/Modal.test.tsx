import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import UserModal from "../../components/Modal";
import { store } from "../../redux";

describe("Modal Test", () => {
  it("Title test", () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserModal
          isOpen={true}
          handleDelete={() => {}}
          content={<></>}
          title={"title"}
          toggleOpen={() => {}}
        />
      </Provider>
    );
    // screen.debug();
    expect(getByText('title')).toBeInTheDocument();
  });
  it("Content test", () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserModal
          isOpen={true}
          handleDelete={() => {}}
          content={<div>abc</div>}
          title={"title"}
          toggleOpen={() => {}}
        />
      </Provider>
    );
    // screen.debug();
    expect(getByText('abc')).toBeInTheDocument();
  });
});
