import {categories} from "../../utils/categories";
import React from 'react'

type CategoriesProps = {
	categoryId: number;
	onClickCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({categoryId, onClickCategory}) => {

	return (
		<div className="categories">
			<ul>
				{categories.map(item => (
					<li
						className={categoryId === item.id ? 'active' : ''}
						key={item.id}
						onClick={() => onClickCategory(item.id)}
					>{item.text}</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
