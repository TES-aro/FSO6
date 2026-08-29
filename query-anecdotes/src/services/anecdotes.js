const dbURL = 'http://localhost:3001/anecdotes'

export const updateAnecdote = async (anecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  }

  const response = await fetch(`${dbURL}/${anecdote.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update an anecdote')
  }

  return await response.json();
}

export const createAnecdote = async (content) => {
  const newAnecdote = {
    content: content,
    votes: 0
  }
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(newAnecdote)
  }

  const response = await fetch(dbURL, options);

  if (!response.ok) {
    throw new Error('failed to creat an anecdote')
  }

  return await response.json()
}

export const getAnecdotes = async () => {
  const response = await fetch(dbURL)
  if (!response.ok){
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}
