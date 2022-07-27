import React from 'react';
import ReactPaginate from "react-paginate";
import cls from "./Pagination.module.scss";

type PaginationProps = {
	setCurrentPage: (page: number) => void;
	currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({setCurrentPage, currentPage}) => {

	return (
			<ReactPaginate
				className={cls.root}
				breakLabel="..."
				nextLabel=">"
				forcePage={--currentPage}
				onPageChange={e => setCurrentPage(++e.selected)}
				pageRangeDisplayed={4}
				pageCount={3}
				previousLabel="<"
			/>
	);
};

export default Pagination;
