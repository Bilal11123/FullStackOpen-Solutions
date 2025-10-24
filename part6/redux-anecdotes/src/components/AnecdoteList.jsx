import { voteOn } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux' 

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
    const anecdotes = useSelector(state => state)
    return (
        <div>
            {anecdotes.map(anecdote => (
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => dispatch(voteOn(anecdote.id))}
                />
            ))}
        </div>
    )
}

export default AnecdoteList