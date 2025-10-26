import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter.length < 1) {
            return state.anecdotes
        }
        return state.anecdotes.filter(a => a.content.includes(state.filter))
    })
    const addVote = (anecdote) => {
        dispatch(voteOnAnecdote(anecdote.id))
        dispatch(notificationChange(`You voted: '${anecdote.content}'`, 10))
    }
    
    return (
        <div>
            {anecdotes.map(anecdote => (
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => addVote(anecdote)}
                />
            ))}
        </div>
    )
}

export default AnecdoteList