import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'


const AnecdoteList = () => {

    const anecdotes = useSelector( state => {
        if (state.filter === '') return state.anecdotes
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })


    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`voted for ${anecdote.content}`, 5))
    }

    // Create a copy of the anecdotes array and sort it
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

    return(
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote => 
            <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />)}
        </div>
    )
}

export default AnecdoteList