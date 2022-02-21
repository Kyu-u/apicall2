import { render } from "@testing-library/react";
import Paginator from "../../components/Pagination";

describe("Paginator Tests", () => {
  it('First Page Test', () => {
    render(<Paginator commentAmount={50} loadPage={() => { }} activePage={ 1}/>)
  })
});
