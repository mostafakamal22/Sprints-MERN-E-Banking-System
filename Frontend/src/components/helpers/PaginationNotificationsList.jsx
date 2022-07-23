import React, { useState } from "react";
import useTable from "../../hooks/useTable";
import TableFooter from "./TableFooter";

export const PaginationNotificationsList = ({
  notifications,
  oneNotification,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(notifications, page, rowsPerPage);
  return (
    <div className="shadow-md rounded-lg my-10 p-5 border-y-4 border-blue-800">
      {slice.map((item) => oneNotification(item))}

      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
};
