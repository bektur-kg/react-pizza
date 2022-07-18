import React from 'react';
import cls from "./SearchInput.module.scss";
import {BsSearch} from "react-icons/bs";
import {BiX} from "react-icons/bi";
import {SearchContext} from "../../App";


const SearchInput = () => {
	const {searchValue, setSearchValue} = React.useContext(SearchContext)

	return (
		<div className={cls.root}>
			<BsSearch className={cls.icon}/>
			<input
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
				type="text"
				className={cls.input}
				placeholder={'Поиск пиццы...'}
			/>
			{
				searchValue && (
					<BiX
						className={cls.cross}
						onClick={() => setSearchValue('')}
					/>
				)
			}
		</div>
	);
};

export default SearchInput;
