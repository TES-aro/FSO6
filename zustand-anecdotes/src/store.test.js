
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

vi.mock('./services/anecdotes', () => ({
	default: {
		getAll: vi.fn(),
		createAnecdote: vi.fn(),
		saveVote: vi.fn(),
		saveDelete: vi.fn()
	}
}));

import anecdoteService from './services/anecdotes';
import { useAnecdoteStore, useAnecdotes, useAnecdoteActions, getAnecdotes, useAnecdoteControls } from './store';

beforeEach(() => {
	useAnecdoteStore.setState({ filter:'', anecdotes:[] });
	vi.clearAllMocks();
});

describe('basic tests', async () => {
	it('starts with expected values', async () => {
		const mockAnecdotes = [{ id:1, cotent: 'test', votes: 0 }];
		anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

		const { result } = renderHook(() => useAnecdoteActions());

		await act(async () => {
			await result.current.initialize();
		});

		const { result: anecdotesResult } = renderHook(() => useAnecdotes());
		console.log(anecdotesResult);
		expect(anecdotesResult.current).toEqual(mockAnecdotes);
	});
});

describe('now with array', () => {
	const anecdotes = [
		{ id:1, content:'test1', votes: 0 },
		{ id:2, content:'lol', votes: 10 },
		{ id:3, content:'second', votes: 2 }
	];

	beforeEach(() => {
		useAnecdoteStore.setState({ anecdotes: anecdotes, filter: '' });
	});

	// this doesn't seem to work for some reason? it works in practice, so something
	// about this testing is off. possibly vite / node still not supporting
	// toTested which is new-ish method?
	it('are they ordered?', () => {
		const { result } = renderHook(() => getAnecdotes());
		expect(result.current[0]).toEqual(anecdotes[1]);
	});
	it('are they filtered?', () => {
		useAnecdoteStore.setState({ filter: 'lol' });
		const { result } = renderHook(() => getAnecdotes());
		console.log(result.current);
		expect(result.current).toHaveLength(1);
	});
	it('upvoting', async () => {
		anecdoteService.saveVote.mockResolvedValue({ ...anecdotes[0], votes: 1 });

		const { result } = renderHook(() => useAnecdoteStore());
		console.log(result);

		await act(async () => {
			await result.current.actions.upvote(anecdotes[0]);
		});
		console.log(result);

		const { result: anecdoteResult } = renderHook(() => getAnecdotes());
		console.log(anecdoteResult);
		expect(anecdoteResult.current[0].votes).toEqual(1);

	});
});
