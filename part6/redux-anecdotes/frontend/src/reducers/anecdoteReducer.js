const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id === action.payload.id ? {...anecdote, votes: anecdote.votes+1} : anecdote)
    case 'CREATE':
      return [...state, asObject(action.payload.content)]
    case 'SET':
      return action.payload.anecdotes
    default: return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id: id
    }
  }
} 

export const addAnecdote = (content) => {
  return {
    type: 'CREATE',
    payload: {
      content: content
    }
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET',
    payload: {
      anecdotes: anecdotes
    }
  }
}

export default reducer