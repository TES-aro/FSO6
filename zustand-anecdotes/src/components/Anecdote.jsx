import { useAnecdoteControls } from '../store.js';
import { setNotification } from '../notification_store.js';

const Anecdote = ({ anecdote }) => {
	const { upvote, deleteAnecdote } = useAnecdoteControls();
	const { setNotif } = setNotification();
	//console.log(anecdote);
	//console.log(`hi! in signual anecdote ${anecdote.content}`);

	const likeHandler = () => {
		upvote(anecdote);
		setNotif('you liked an anecdote');

	};

	const delHandler = () => {
		deleteAnecdote(anecdote.id);
		setNotif(`you deleted anecdote ${anecdote.id}`);
	};

	if (anecdote.votes === 0){
		return (
			<li>
				{anecdote.content}
				has {anecdote.votes} votes
				<button onClick={likeHandler}> like </button>
				<button onClick={delHandler}> delete </button>
			</li>
		);
	}
	return (
		<li>
			{anecdote.content} <br/>
			has {anecdote.votes} votes
			<button onClick={likeHandler}> like </button>
		</li>
	);
};

export default Anecdote;
