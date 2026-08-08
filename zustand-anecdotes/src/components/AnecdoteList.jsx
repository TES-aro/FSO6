import { useAnecdotes } from '../store.js';
import Anecdote from './Anecdote.jsx';

const AnecdoteList = () => {
	const anecdotes = useAnecdotes();
	console.log(anecdotes);
	return(
		<div>
			<ul>
				{anecdotes.map(a => { return (
					<Anecdote anecdote={a} key={a.id}/>
				);})}
			</ul>
		</div>
	);
};

export default AnecdoteList;
