import {useAnecdotes} from '../anecdote_store.js';
import Anecdote from './Anecdote.jsx';

const Anecdotes = () => {
	return(
		<div>
			<ul>
				{anecdotes.map(anecdote => {
					<Anecdote/>
				})}
			</ul>
		</div>
	)
}

export default Anecdotes
