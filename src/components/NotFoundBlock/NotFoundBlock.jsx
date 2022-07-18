import React from 'react';
import {BiErrorAlt} from "react-icons/bi";
import cls from "./NotFoundBlock.module.scss";


const NotFoundBlock = () => {
	return (
		<div className={cls.root}>
			<span><BiErrorAlt/></span>
			<h1>Ничего не найдено</h1>
			<p>Извините, на нашем сайте нет такой страницы</p>
		</div>
	);
};

export default NotFoundBlock;
