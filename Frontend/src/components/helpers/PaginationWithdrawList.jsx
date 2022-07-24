import React, { useState } from "react";
import useTable from "../../hooks/useTable";
import Pagination from "./Pagination";

export const PaginationWithdrawList = ({
  withdrawLogs,
  withdrawLog,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(withdrawLogs, page, rowsPerPage);
  return (
    <div className="shadow-md rounded-lg my-10 p-5 border-y-4 border-blue-800">
      <ul className="basis-full flex flex-col p-4 md:p-10 text-xs md:text-base text-gray-800 font-bold">
        {slice.map((item) => withdrawLog(item))}
      </ul>
      <Pagination range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
};
