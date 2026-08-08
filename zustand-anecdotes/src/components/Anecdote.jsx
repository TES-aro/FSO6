import { useAnecdoteControls } from '../store.js';

const Anecdote = ({ anecdote }) => {
	const { upvote } = useAnecdoteControls();
	console.log(anecdote);
	console.log(`hi! in signual anecdote ${anecdote.content}`);

	const likeHandler = () => {
		upvote(anecdote.id);
	};

	return (
		<li>
			{anecdote.content} <br/>
			has {anecdote.votes} votes
			<button onClick={likeHandler}> like </button>
		</li>
	);
};

export default Anecdote;