import { render, screen, within } from "@testing-library/react";
import Paginator from "../../components/Pagination";

describe("Paginator Tests", () => {
  it("First Page Test", () => {
    const mockFunction = jest.fn();
    render(
      <Paginator commentAmount={500} loadPage={mockFunction} activePage={1} />
    );
    const navigation = screen.getByRole("navigation");
    const { getByText } = within(navigation);
    const pageOneButton = getByText('1');
    // screen.debug(getByText('1'));
    expect(pageOneButton).toHaveClass('active');
    // expect(prevButton).toBeDisabled();
  });
});
