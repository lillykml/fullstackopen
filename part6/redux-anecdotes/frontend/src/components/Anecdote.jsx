const Anecdote = ({anecdote, vote}) => {
    return(
        <div>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
    )
}

export default Anecdote