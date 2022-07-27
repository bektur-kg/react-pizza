import ContentLoader from "react-content-loader"

const PizzaSkeleton = () => (
	<div className={'pizza-block-wrapper'}>
		<ContentLoader
			speed={2}
			width={280}
			height={480}
			className={'pizza-block'}
			viewBox="0 0 280 480"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<circle cx="140" cy="136" r="125"/>
			<rect x="0" y="280" rx="10" ry="10" width="280" height="20"/>
			<rect x="0" y="315" rx="10" ry="10" width="280" height="75"/>
			<rect x="0" y="417" rx="10" ry="10" width="102" height="40"/>
			<rect x="128" y="407" rx="35" ry="35" width="152" height="60"/>
		</ContentLoader>
	</div>
)

export default PizzaSkeleton