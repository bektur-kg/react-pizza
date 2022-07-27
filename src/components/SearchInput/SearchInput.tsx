import React from 'react';
import cls from "./SearchInput.module.scss";
import {BsSearch} from "react-icons/bs";
import debounce from "lodash.debounce";
import {BiX} from "react-icons/bi";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";


const SearchInput: React.FC = () => {
	const dispatch = useDispatch()
	const [inputValue, setInputValue] = React.useState('')
	const inputRef = React.useRef<HTMLInputElement>(null)

	const updateSearchValue = React.useCallback(
		debounce((value: string) => {
			dispatch(setSearchValue(value))
		}, 250),
		[])

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
		updateSearchValue(e.target.value)
	}

	const onClickClear = () => {
		dispatch(setSearchValue(''))
		setInputValue('')
		inputRef.current?.focus()
	}

	return (
		<div className={cls.root}>
			<BsSearch className={cls.icon}/>
			<input
				ref={inputRef}
				value={inputValue}
				onChange={e => onChangeInput(e)}
				type="text"
				className={cls.input}
				placeholder={'Поиск пиццы...'}
			/>
			{
				inputValue && (
					<BiX
						className={cls.cross}
						onClick={onClickClear}
					/>
				)
			}
		</div>
	);
};

export default SearchInput;
