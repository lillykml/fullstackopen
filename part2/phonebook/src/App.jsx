import axios from 'axios'
import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import NewPerson from './components/NewPerson'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilterdPersons] = useState(persons)

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      setFilterdPersons(response.data)
    })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
    setFilterdPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const addNumber = (event) => {
    event.preventDefault()
    const exists = persons.find(person => person.name === newName);

    if (exists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={nameFilter} onChange={handleFilterChange}/></div>
      <NewPerson submitHandler={addNumber} newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Numbers phonebook={filteredPersons} />
    </div>
  )
}

export default App