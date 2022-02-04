import React, { useState } from "react";
import { Pagination } from "semantic-ui-react";
export default function Paginator({ commentAmount, loadPage, activePage }) {
  const handlePaginationChange = (e, { activePage }) => {
    // console.log(e);
    loadPage(activePage);

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
