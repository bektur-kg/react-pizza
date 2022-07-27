import { RootState } from './../store';
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

type TPizzaItem = {
	id: number;
  imageUrl: string;
  category: number;
  rating: number;
  types: number[];
  price: number;
  sizes: number[];
  title: string
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface IPizzaSliceState {
	status: Status;
	items: TPizzaItem[]
}


export const fetchPizzas = createAsyncThunk<TPizzaItem[], Record<string, string>>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const {category, order, sortQuery, search, currentPage} = params
		const {data} = await axios.get<TPizzaItem[]>(`https://62c3d582abea8c085a643b10.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortQuery}&order=${order}&${search}`)
		return data
	}
)

const initialState: IPizzaSliceState = {
	status: Status.LOADING,
	items: []
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems: (state, action) => {
			state.items = action.payload
		}
	},
	extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
     	state.status = Status.LOADING
			state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
     state.items = action.payload
			state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
     	state.status = Status.ERROR
			state.items = []
    })
  },
})

export const pizzaSelect = (state: RootState) => state.pizza

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer