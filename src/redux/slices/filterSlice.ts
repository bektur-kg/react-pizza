import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSortSlice = { 
		sortProperty: 'rating' | 'price' | 'title'| '-rating' | '-price' | '-title';
		span: 'популярности (ASC)' | 'популярности (DESC)' | 'цене (ASC)'| 'цене (DESC)' | 'алфавиту (ASC)' | 'алфавиту (DESC)';
}

interface IFilterSliceState {
	categoryId: number;
	currentPage: number;
	search: string;
	sort: TSortSlice; 
}

interface ISetFilters {
	categoryId: string;
	currentPage: string;
	sortProperty: string;
	sort: TSortSlice;
}

const initialState: IFilterSliceState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		span: 'популярности (ASC)', sortProperty: 'rating'
	},
	search: ''
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId: (state, action: PayloadAction<number> ) => {
			state.categoryId = action.payload
		},
		setSortType: (state, action: PayloadAction<TSortSlice>) => {
			state.sort = action.payload
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		setFilters: (state, actions: PayloadAction<ISetFilters>) => {
			state.categoryId = +actions.payload.categoryId
			state.currentPage = +actions.payload.currentPage
			state.sort = actions.payload.sort
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.search = action.payload
		}
	}
})

export const FilterSortSelect = (state: RootState) => state.filter.sort
export const FilterSelect = (state: RootState) => state.filter

export const {setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer

