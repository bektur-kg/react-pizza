import React from 'react';
import Categories from "../../components/Categories/Categories";
import Sort from "../../components/Sort/Sort";
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import PizzaSkeleton from "../../components/PizzaCard/Skeleton";
import Pagination from "../../components/Pagination/Pagination";
import {SearchContext} from "../../App";
import {setCategoryId} from "../../redux/slices/filterSlice";

import {useSelector, useDispatch} from "react-redux";

const Home = () => {
	const {searchValue} = React.useContext(SearchContext)
	const [pizzasData, setPizzasData] = React.useState([]);
	const [isLoading, setIsIsLoading] = React.useState(true)
	const [currentPage, setCurrentPage] = React.useState(1)
	const {categoryId, sort} = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const changeActiveCategory = id => {
		dispatch(setCategoryId(id))
	}

	React.useEffect(() => {
		setIsIsLoading(true)
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const order = sort.sortProperty.includes('-') ? 'desc' : 'asc'
		const sortQuery = sort.sortProperty.replace('-', '')
		const search = searchValue ? `search=${searchValue}` : ''

		fetch(
			`https://62c3d582abea8c085a643b10.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortQuery}&order=${order}&${search}`
		)
			.then(res => res.json())
			.then(r => {
				setPizzasData(r)
				setIsIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [categoryId, sort, searchValue, currentPage])

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					categoryId={categoryId}
					onClickCategory={changeActiveCategory}
				/>
				<Sort/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					!isLoading
						?
						pizzasData.map((obj) => (
							<PizzaCard
								key={obj.id}
								{...obj}
							/>
						))
						:
						[...new Array(6)].map((_, i) => <PizzaSkeleton key={i}/>)
				}
			</div>
			<Pagination setCurrentPage={setCurrentPage}/>

		</div>

	);
};

export default Home;
