import React, { MouseEvent } from "react";
import { Pagination, PaginationProps } from "semantic-ui-react";
import { IPaginatorProps } from "../interfaces";
export default function Paginator(props: IPaginatorProps) {
  const { commentAmount, loadPage, activePage } = props;
  console.log('PAGINATOR PROPS', commentAmount, activePage);
  const handlePaginationChange = (
    event: MouseEvent<HTMLAnchorElement>,
    { activePage }: PaginationProps
  ) => {
    // console.log(e);
    loadPage(activePage as number);

    // console.log(activePage);
  };

  return (
    <Pagination
      data-testid='pagination'
      onPageChange={handlePaginationChange}
      activePage={activePage}
      totalPages={Math.ceil(commentAmount / 10)}
    />
  );
}
