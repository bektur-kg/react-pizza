import React from 'react';
import Sort, {sortTypes} from "../../components/Sort/Sort";
import Categories from "../../components/Categories/Categories";
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import PizzaSkeleton from "../../components/PizzaCard/Skeleton";
import Pagination from "../../components/Pagination/Pagination";
import qs from "qs";
import {FilterSelect, setCategoryId, setCurrentPage, setFilters, TSortSlice} from "../../redux/slices/filterSlice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchPizzas, pizzaSelect} from "../../redux/slices/pizzaSlice";
import { useAppDispatch } from '../../redux/store';

type TQuery = {
	categoryId: string;
	currentPage: string;
	sortProperty: string;	
}

const Home: React.FC = () => {
	const navigate = useNavigate()
	const {categoryId, sort, currentPage, search: searchValue} = useSelector(FilterSelect)
	const {items: pizzasData, status} = useSelector(pizzaSelect)
	const dispatch = useAppDispatch()
	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const changeActiveCategory = (id: number) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	const fetchData = () => {
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const order = sort.sortProperty.includes('-') ? 'desc' : 'asc'
		const sortQuery = sort.sortProperty.replace('-', '')
		const search = searchValue ? `search=${searchValue}` : ''

		dispatch(
			fetchPizzas({category, order, sortQuery, search, currentPage: String(currentPage)})
			)
	}

	React.useEffect(() => {
		window.scrollTo(0, 0)
		if (!isSearch.current) {
			fetchData()
		}
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as TQuery
						
			const sort = sortTypes.find(obj => obj.sortProperty === params.sortProperty)
			
			if(sort){
				
			dispatch(setFilters({...params , sort}))

			}
		

			isSearch.current = true
		}

	}, [dispatch])

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})
			navigate(`/?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, searchValue, currentPage, navigate])

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
			{
				status === 'error' ?
					<div className={'content__error'}>
						<h2>Произоша ошибка</h2>
						<p>Возникла ошибка при поучениии данных с базы!</p>
					</div>
					: <div className="content__items">
					{
						status === 'success'
							?
							pizzasData.map((obj: any) => (
								<PizzaCard
									key={obj.id}
									{...obj}
								/>
							))
							:
							[...new Array(6)].map((_, i) => <PizzaSkeleton key={i}/>)
					}
				</div>
			}
			<Pagination currentPage={currentPage} setCurrentPage={onChangePage}/>

		</div>

	);
};

export default Home;
