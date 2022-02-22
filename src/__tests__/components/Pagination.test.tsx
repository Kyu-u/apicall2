import { render, screen } from "@testing-library/react";
import Paginator from "../../components/Pagination";

describe("Paginator Tests", () => {
  it("First Page Test", () => {
    render(
      <Paginator commentAmount={500} loadPage={() => {}} activePage={1} />
    );
    const navigation = screen.queryByRole("navigation");
    const firstItemButton = screen.getByLabelText("First item");
    const prevButton = screen.getByLabelText("Previous item");


    // expect(firstItemButton).toHaveAttribute('aria-disabled', 'false');
    // expect(prevButton).toBeDisabled();
  });
});
