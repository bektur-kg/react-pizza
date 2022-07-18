import React from 'react';
import ReactPaginate from "react-paginate";
import cls from "./Pagination.module.scss";


const Pagination = ({setCurrentPage}) => {
	return (
			<ReactPaginate
				className={cls.root}
				breakLabel="..."
				nextLabel=">"
				onPageChange={e => setCurrentPage(++e.selected)}
				pageRangeDisplayed={4}
				pageCount={3}
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
	);
};

export default Pagination;
