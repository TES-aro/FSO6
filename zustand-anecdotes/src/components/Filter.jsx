import {useAnecdoteControls} from '../store.js';

const Filter = () => {
	const {updateFilter} = useAnecdoteControls();
	const filterHandle = (e) => {
		updateFilter(e.target.value);
	}
	return(
		<div>
			<label>
				filter string: <br/>
				<input name='filter string' onChange={filterHandle} />
			</label>
		</div>
	)
}

export default Filter;
