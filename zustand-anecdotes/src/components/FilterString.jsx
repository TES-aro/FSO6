import {useAnecdoteFilter} from '../store.js';

const FilterString = () => {
	const filterString = useAnecdoteFilter();
	return(
		<div>
			{filterString}
		</div>
	)
}

export default FilterString;
