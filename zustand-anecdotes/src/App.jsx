
import { useAnecdotes, useAnecdoteControls } from './store'

const App = () => {
  const anecdotes = useAnecdotes()
  const {upvote, add} = useAnecdoteControls();
  

  const vote = id => {
	  upvote(id)
    console.log('vote', id)
  }

  const handleSumit = (e) => {
	  e.preventDefault();
	  const form = e.target;
    const formData = new FormData(form);
    const anecdote = formData.get("anecdote");
    add(anecdote)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSumit}>
        <div>
          <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App