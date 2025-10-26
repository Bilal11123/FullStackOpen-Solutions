import { createSlice, current } from '@reduxjs/toolkit'
import  anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteOn(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      console.log(current(state))
      const updatedAnecdotes = state.map(anecdote => 
        (anecdote.id !== id ? anecdote : changedAnecdote))
      return updatedAnecdotes.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

const { createAnecdote, setAnecdotes, voteOn } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(sortedAnecdotes))
  }
}

export const appendAnecdotes = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteOnAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.voteOn(id)
    dispatch(voteOn(id))
  }
}

export default anecdoteSlice.reducer
