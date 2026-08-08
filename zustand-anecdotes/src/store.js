import { create } from 'zustand';

const storeAnecdotes = create(set => ({
	anecdotes: [],
	actions: {
		upvote: id => set(
			state => ({
				anecdotes: (state.anecdotes.map(a => a.id === id
					? { ...a, votes: a.votes + 1 }
					: a
				)).toSorted((a,b) => a.votes < b.votes)
			})
		),
		add: anecdote => set(
			state => ({
				anecdotes: state.anecdotes.concat({
					content: anecdote,
					votes: 0,
					id: genID()
				})
			})
		)
	}
}));

// yeah, it's lazy but not what we're training here
const genID = () => {
	return Math.floor(Math.random()*1000000);
};
export const useAnecdotes = () => storeAnecdotes(state => state.anecdotes);
export const useAnecdoteControls = () => storeAnecdotes(state => state.actions);
