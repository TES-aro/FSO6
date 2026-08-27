import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import anecdoteService from './services/anecdotes.js';

export const useAnecdoteStore = create(devtools(set => ({
	filter: '',
	anecdotes: [{content: "lorem ipsum", votes:0, id:124}],
	actions: {
		initialize: async () => {
			try{
				const fetchedData = await anecdoteService.getAll();
				
				set(
					state => ({
						anecdotes: fetchedData.toSorted((a,b) => a.votes < b.votes)
					})
				);
			} catch (e) {
				console.error(e);
			}
		},
		updateFilter: filterStr => set(
			state => ({ filter: filterStr })
		),
		upvote: async anecdote => {
			try{
				anecdote.votes = anecdote.votes + 1;
				await anecdoteService.saveVote(anecdote);
				set(
					state => ({
						anecdotes: (state.anecdotes.map(a => a.id === anecdote.id
							? anecdote
							: a
						)).toSorted((a,b) => a.votes < b.votes)
					})
				);
			} catch (e) {
				console.error(e);
			}
		},
		add: async content => {
			try {
				const newAnecdote = await anecdoteService.createAnecdote(content);
				set(
					state => ({
						anecdotes: state.anecdotes.concat({
							content: content,
							votes: 0,
							id: newAnecdote.id
						})
					})
				);
			} catch (e) {
				console.error(e);
			}
		},
		deleteAnecdote: async id => {
			try{
				await anecdoteService.saveDelete(id);
				set(
					state => ({
						anecdotes: state.anecdotes.filter( a => a.id !== id)
					})
				);
			} catch(e) {
				console.error(e);
			}
		}
	}
})));

export const getAnecdotes = () => {
	const anecdotes = useAnecdoteStore((state) => state.anecdotes);
	const filter = useAnecdoteStore((state) => state.filter);
	const sorted = anecdotes.toSorted((a,b) => a.votes > b.votes)
	if (filter === ''){
		return sorted
	}
	return sorted.filter( a => a.content.includes(filter))
}

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions);
export const useAnecdotes = () => useAnecdoteStore(state => state.anecdotes);
export const useAnecdoteFilter = () => useAnecdoteStore(state => state.filter);
export const useAnecdoteControls = () => useAnecdoteStore(state => state.actions);
