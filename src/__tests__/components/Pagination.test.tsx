import { render, screen } from "@testing-library/react";
import Paginator from "../../components/Pagination";

describe("Paginator Tests", () => {
  it('First Page Test', () => {
    const { getByLabelText} = render(<Paginator commentAmount={500} loadPage={() => { }} activePage={1} />);
    const firstItemButton = getByLabelText('First Item');
    const prevButton = getByLabelText('Previous Item');
    // screen.getAllByRole('');

    expect(firstItemButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  })
});
