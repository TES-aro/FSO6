import { useAnecdotes, useAnecdoteFilter, useAnecdoteControls } from '../store.js';
import Anecdote from './Anecdote.jsx';
import { useEffect } from 'react';

const AnecdoteList = () => {
	const anecdotes = useAnecdotes();
	const filter = useAnecdoteFilter();
	const { getAll } = useAnecdoteControls();
	useEffect(() => {
		getAll();
	},[getAll]);
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
