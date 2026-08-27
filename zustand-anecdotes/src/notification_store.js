import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
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

export const useNotification = () => storeNotification(state => state.notif);
export const setNotification = () => storeNotification(state => state.actions);
