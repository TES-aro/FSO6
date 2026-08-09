import { useAnecdotes, useAnecdoteFilter } from '../store.js';
import Anecdote from './Anecdote.jsx';

const AnecdoteList = () => {
	const anecdotes = useAnecdotes();
	const filter = useAnecdoteFilter();
	return(
		<div>
			<ul>
				{anecdotes.map(a => {
					if (!a.content.includes(filter)){return};
					return (<Anecdote anecdote={a} key={a.id}/>);
				})}
			</ul>
		</div>
	);
};

export default AnecdoteList;
