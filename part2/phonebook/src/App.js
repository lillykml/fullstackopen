import { useState, useEffect } from 'react'
import personService from "./services/persons"
import Person from "./components/Person"
 
const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [displayedPersons, setDisplayedPersons] = useState(persons)

  useEffect(() => {
    console.log("Effect")
    personService
    .getAll()
    .then((response) => {
      console.log("Fullfilled")
      setPersons(response.data)
      setDisplayedPersons(response.data)
    })
  }, [])


  const addNewPersonHandler = (event) => {

    event.preventDefault()

    //Check if the person exists and number should be replaced
    let add = persons.filter((person) => person.name == newName).length === 0 ? true : false

    if (!add && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      add = true
    }
    
    if (add) {

      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response.data))
        setDisplayedPersons(displayedPersons.concat(response.data))
      })

      setNewName("")
      setNewNumber("")
    }}

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

  const deletePersonHandler = (person) => {

    window.confirm(`Delete ${person.name}`)
    personService.deletePerson(person.id)
    .then(() => {
      setPersons(persons.filter(p => p.id !== person.id))
      setDisplayedPersons(persons.filter(p => p.id !== person.id))
    })
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
      {displayedPersons.map((person) => <Person key={person.id} person={person} deleteHandler={() => deletePersonHandler(person)}/>)}
    </div>
  )
}

export default App