import React from "react";
import { useState } from "react";
import useTable from "../../hooks/useTable";
import Pagination from "./Pagination";

export const PaginationTable = ({
  tableHeader,
  tableBodyData,
  tableRow,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(tableBodyData, page, rowsPerPage);
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-10 border-y-4 border-blue-800 rounded">
      <table className="w-full text-sm font-bold text-gray-500 ">
        <thead className="text-gray-900 uppercase bg-gray-300">
          {tableHeader}
        </thead>
        <tbody>{slice.map((item, index) => tableRow(item, index))}</tbody>
      </table>

      <Pagination range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
};
