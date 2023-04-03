import { useState, useEffect } from "react";
import useTable from "../../hooks/useTable";
import Pagination from "./Pagination";
import { MainSpinner } from "../shared/MainSpinner";

export const PaginationTable = ({
  tableHeader,
  tableBodyData,
  tableRow,
  rowsPerPage,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [slice, setSlice] = useState([]);
  const [range, setRange] = useState([]);
  const [_timeoutId, setTimeoutId] = useState(null);
  const [page, setPage] = useState(1);

  const { slice: sliceArray, range: rangeArray } = useTable(
    tableBodyData,
    page,
    rowsPerPage
  );

  useEffect(() => {
    const id = setTimeout(() => {
      if (sliceArray.length > 0 && rangeArray.length > 0) {
        setSlice(sliceArray);
        setRange(rangeArray);
        setIsLoading(false);
      }
    }, 1500);
    setTimeoutId(id);

    return () => {
      clearTimeout(id);
    };
  }, [tableBodyData, page, rowsPerPage, sliceArray, rangeArray]);

  const spinnerSize = window.innerWidth < 400 ? 30 : 45;

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-10 border-y-4 border-red-800 rounded scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-400">
      {isLoading && (
        <MainSpinner spinnerSize={spinnerSize} spinnerHeight="50vh" />
      )}
      {!isLoading && (
        <>
          <table className="w-full !text-xs text-gray-500 ">
            <thead className="text-gray-900 uppercase bg-gray-300 !font-semibold">
              {tableHeader}
            </thead>
            <tbody className="!font-normal">
              {slice.map((item, index) => tableRow(item, index))}
            </tbody>
          </table>

          <Pagination
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </>
      )}
    </div>
  );
};
