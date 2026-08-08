import { create } from 'zustand'

const useCounterStore = create(set => ({
	counter: {
  	good: 10,
  	neutral: 5,
  	bad: 5,
	},
	actions: {
  	incrementGood: () => set(state => ({ counter: {
	  	good: state.counter.good + 1,
	  	neutral: state.counter.neutral,
	  	bad: state.counter.bad
  	}})),
		incrementNeutral: () => set(state => ({ counter: {
			good: state.counter.good,
			neutral: state.counter.neutral + 1,
			bad: state.counter.bad
		}})),
		incrementBad: () => set(state => ({ counter: {...state.counter, bad: state.counter.bad + 1 }})),
	}
}))

export const useCounter = () => useCounterStore(state => state.counter)
export const useCounterControls = () => useCounterStore(state => state.actions)
