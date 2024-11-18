import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <div className="flex justify-center mt-5 px-3">
      <ReactPaginate
        previousLabel={<span className="text-white">{"<"}</span>}
        nextLabel={<span className="text-white">{">"}</span>}
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName="flex items-center space-x-2"
        pageClassName="px-3 py-1 rounded-md bg-gray-700 text-white text-sm sm:text-base"
        activeClassName="bg-blue-500"
        disabledClassName="opacity-50 cursor-not-allowed"
        previousClassName="px-3 py-1 rounded-md bg-gray-700 text-white text-sm sm:text-base"
        nextClassName="px-3 py-1 rounded-md bg-gray-700 text-white text-sm sm:text-base"
      />
    </div>
  );
};

export default Pagination;
