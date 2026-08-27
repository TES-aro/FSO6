
import { setNotification, useAnecdoteControls } from '../store';

const AnecdoteForm = () => {

	const { add } = useAnecdoteControls();
	const {setNotif} = setNotification();
	const handleSumit = (e) => {
	  e.preventDefault();
	  const form = e.target;
		const formData = new FormData(form);
		const anecdote = formData.get('anecdote');
		add(anecdote);
		setNotif(`you created a new notification!`)
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
