import React, { useState } from "react";
import useTable from "../../hooks/useTable";
import Pagination from "./Pagination";

export const PaginationNotificationsList = ({
  notifications,
  oneNotification,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(notifications, page, rowsPerPage);
  return (
    <div className="shadow-md rounded-lg my-10 p-4 border-y-4 border-blue-800">
      {slice.map((item) => oneNotification(item))}

      <Pagination range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
};
