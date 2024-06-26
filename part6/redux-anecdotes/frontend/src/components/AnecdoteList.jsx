import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'


const AnecdoteList = () => {

    const anecdotes = useSelector( state => {
        if (state.filter === '') return state.anecdotes
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })


    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return(
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote => 
            <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />)}
        </div>
    )
}

export default AnecdoteList