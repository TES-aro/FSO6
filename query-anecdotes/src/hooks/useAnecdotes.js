import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote, getAnecdotes, updateAnecdote } from '../services/anecdotes.js';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext.jsx';

export const useAnecdotes = () => {
  const {setNotification} = useContext(NotificationContext)
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  })

  const newAnecodteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification('created a new anecdote')
    },
    onError: error => setNotification(error.message) 
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => {
        if (anecdote.id !== updatedAnecdote.id){
          return anecdote
        }
        return updatedAnecdote
      }))
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecodteMutation.mutate(content),
    upvote: (anecdote) => {
      updateAnecdoteMutation.mutate({
        ...anecdote, votes: anecdote.votes + 1
      })
    setNotification('you upvoted an anecdote')
    }
  }
}
