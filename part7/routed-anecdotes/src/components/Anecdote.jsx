const Anecdote = ({ anecdote }) => {
    console.log(anecdote)
    return(
        <li>{anecdote.content}</li>
    )
}

export default Anecdote