import React, { useEffect } from "react";

const Pagination = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <nav className="mx-auto my-5 text-center">
      <ul className="inline-flex items-center flex-wrap -space-x-px">
        {range.map((el, index) => (
          <li key={index} onClick={() => setPage(el)}>
            <button
              className={`${
                el === page && "bg-blue-100"
              } py-2 px-3 leading-tight text-blue-900 border border-blue-300 hover:bg-blue-100 hover:text-gray-700`}
            >
              {el}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
