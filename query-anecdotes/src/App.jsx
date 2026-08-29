import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes.js';

const App = () => {
  const { anecdotes, isPending, isError, upvote } = useAnecdotes();

  const handleVote = (anecdote) => {
    upvote(anecdote)
  }
  
  if (isPending) {
    return <div> loading </div>
  }

  if (isError) {
    return <div> issue with fetching data from database </div>
  }

 


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}


export default App
