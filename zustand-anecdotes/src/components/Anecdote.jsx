import {useAnecdoteControls } from '../anecdote_store.js'

const Anecdote = (anecdote) => {
	const {like} = useAnecdoteControls

	const likeHandler = () => {
		like(anecdote.id)
	}

	return (
		<li key={anecdote.id}>
			{anecdote.text}
			<button onClick={likeHandler}> like </button>
		</li>
	)
}

export default Anecdote