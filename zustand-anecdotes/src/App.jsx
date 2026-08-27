import AnecdoteList from './components/AnecdoteList.jsx';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import Filter from './components/Filter.jsx';
import FilterString from './components/FilterString.jsx';
import Notification from './components/Notification.jsx';

const App = () => {
	return (
		<div>
			<Notification />
			<h2>Anecdotes</h2>
			<Filter />
			<FilterString />
			<AnecdoteList />
			<h2>create new</h2>
			<AnecdoteForm />
		</div>
	);
};

export default App;
