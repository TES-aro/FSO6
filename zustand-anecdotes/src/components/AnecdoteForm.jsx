
import { useAnecdoteControls } from '../store';

const AnecdoteForm = () => {

	const { add } = useAnecdoteControls();
	const handleSumit = (e) => {
	  e.preventDefault();
	  const form = e.target;
		const formData = new FormData(form);
		const anecdote = formData.get('anecdote');
		add(anecdote);
		e.target.reset();
	};

	return (
		<>
			<form onSubmit={handleSumit}>
				<div>
					<input name='anecdote'/>
				</div>
				<button type='submit'>create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;