import React, {  MouseEvent } from "react";
import { Pagination, PaginationProps } from "semantic-ui-react";
import { IPaginatorProps } from "../interfaces";
export default function Paginator(props: IPaginatorProps) {
  const { commentAmount, loadPage, activePage } = props;
  const handlePaginationChange = (event:MouseEvent<HTMLAnchorElement>, {activePage}:PaginationProps) => {
    // console.log(e);
    loadPage(activePage as number);

    // console.log(activePage);
  };
  
  return (
    <div>
      <Pagination
        onPageChange={handlePaginationChange}
        activePage={activePage}
        totalPages={commentAmount / 10}
      />
    </div>
  );
}
