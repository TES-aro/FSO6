import { create } from 'zustand';
import { getAll, createAnecdote, saveVote, saveDelete } from './services/anecdotes.js';

export const storeNotification = create(set => ({
	notif: '',
	actions: {
		setNotif: message => {
			console.log(`got a message ${message}`)
			set(
				state => ({
					notif: message
				})
			)
			setTimeout(() => {
				set(state => ({notif:''}))
			}, 5000)
		}
	}
}))

const storeAnecdotes = create(set => ({
	filter: '',
	anecdotes: [],
	actions: {
		getAll: async () => {
			try{
				const fetchedData = await getAll();
				
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

export const useNotification = () => storeNotification(state => state.notif);
export const setNotification = () => storeNotification(state => state.actions);
export const useAnecdotes = () => storeAnecdotes(state => state.anecdotes);
export const useAnecdoteFilter = () => storeAnecdotes(state => state.filter);
export const useAnecdoteControls = () => storeAnecdotes(state => state.actions);
