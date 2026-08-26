import { create } from 'zustand';
import { getAll, createAnecdote, saveVote, saveDelete } from './services/anecdotes.js';

const storeAnecdotes = create(set => ({
	filter: '',
	anecdotes: [],
	actions: {
		getAll: async () => {
			try{
				const fetchedData = await getAll();
				set(
					state => ({
						anecdotes: fetchedData
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
				await saveVote(anecdote);
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
				const newAnecdote = await createAnecdote(content);
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
				await saveDelete(id);
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
}));

// yeah, it's lazy but not what we're training here
const genID = () => {
	return Math.floor(Math.random()*1000000);
};
export const useAnecdotes = () => storeAnecdotes(state => state.anecdotes);
export const useAnecdoteFilter = () => storeAnecdotes(state => state.filter);
export const useAnecdoteControls = () => storeAnecdotes(state => state.actions);
