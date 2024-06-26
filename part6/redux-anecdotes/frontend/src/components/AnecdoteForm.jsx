import { addAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.create(content)
        dispatch(addAnecdote(newAnecdote))
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm