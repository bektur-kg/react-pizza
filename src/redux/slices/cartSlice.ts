import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TCartItem = {
	id: number;
	imageUrl: string;
	type: string;
	size: number;
	title: string;
	price: number;
	count: number;
}

interface CartSliceState {
	totalPrice: number;
	items: TCartItem[];
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: []
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<TCartItem>) => {
			const foundItem = state.items.find(obj => obj.id === action.payload.id)

			if (foundItem) {
				foundItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1
				})
			}

			state.totalPrice = state.items.reduce((total, obj) => total + obj.price * obj.count, 0)
		},
		removeItem: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(obj => obj.id !== action.payload)
		},
		minusCount: (state, action: PayloadAction<number>) => {
			const foundItem = state.items.find(obj => obj.id === action.payload)

			if (foundItem) {
				foundItem.count--
			}
		},
		clearItems: (state) => {
			state.items = []
			state.totalPrice = 0
		},
	}
})

export const cartSelect = (state: RootState) => state.cart
export const cartItemSelect = (id: number) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)

export const {addItem, removeItem, clearItems, minusCount} = cartSlice.actions

export default cartSlice.reducer