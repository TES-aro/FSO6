const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
	const response = await fetch(baseUrl);

	if (!response.ok) {
		throw new Error('failed to fetch blogs');
	}

	const res = await response.json();
	console.log(res);
	return res;
};

export const createAnecdote = async (content) => {
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ content, votes: 0 })
	});

	if (!response.ok){
		throw new Error('failed to create a blog');
	}
	return await response.json();
};

export const saveVote = async (anecdote) => {
	const response = await fetch(`${baseUrl}/${anecdote.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(anecdote)
	});

	if (!response.ok) {
		throw new Error('Failed to update anecdote votes');
	}

	return await response.json();
};

export const saveDelete = async (id) => {
	const response = await fetch(`${baseUrl}/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		throw new Error('Failed to delete an anecdote');
	}

	return response;
};

export default { getAll, createAnecdote, saveVote };
