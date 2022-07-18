import {categories} from "../../utils/categories";
import React from 'react'

const Categories = ({categoryId, onClickCategory}) => {

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
