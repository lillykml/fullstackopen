import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [displayedPersons, setDisplayedPersons] = useState(persons)

  useEffect(() => {
    console.log("Effect")
    axios.get("http://localhost:3001/persons")
    .then((response) => {
      console.log("Fullfilled")
      setPersons(response.data)
      setDisplayedPersons(response.data)
    })
  }, [])

  console.log('render', persons.length, 'persons')

  const addNewPersonHandler = (event) => {

    event.preventDefault()

    //check if newName is already in the persons array
    let exists = persons.filter((person) => person.name == newName)
    if(exists.length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setDisplayedPersons(displayedPersons.concat(personObject))
    }

    setNewName("")
    setNewNumber("")
  }

  const newPersonHandler = (event) => {
    setNewName(event.target.value)
  }

  const newNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const displayHandler = (event) => {
    const filteredPersons = persons.filter((person) => person.name.startsWith(event.target.value))
    setDisplayedPersons(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>Search for a name</p>
      <input onChange={displayHandler}/>
      <h2>Add a new number</h2>
      <form onSubmit={addNewPersonHandler}>
        <div>
          name: <input value={newName} onChange={newPersonHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={newNumberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {displayedPersons.map((person) => <p>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App