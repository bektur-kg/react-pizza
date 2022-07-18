const {createSlice} = require("@reduxjs/toolkit");
const initialState = {
	categoryId: 0,
	sort: {
		span: 'популярности (ASC)', sortProperty: 'rating'
	}
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload
		},
		setSortType: (state, action) => {
			state.sort = action.payload
		}
	}
})

export const {setCategoryId, setSortType} = filterSlice.actions

export default filterSlice.reducer

