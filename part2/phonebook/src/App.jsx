import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import NewPerson from './components/NewPerson'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilterdPersons] = useState(persons)

  useEffect(() => {
    phonebookService.getAll()
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
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (confirm(`${newName} is already added to phoneboo, replace the old number with a new one?`)) {
        const updatedPerson = {...existingPerson, number: newNumber} 
        phonebookService
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(p=> p.id !== existingPerson.id ? p : response.data))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      phonebookService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleDeletion = (id) => {
    const person = persons.find(n => n.id === id)
    if(confirm(`Delete ${person.name}?`)) {
      phonebookService.deletePerson(id).then(setPersons(persons.filter(person => person.id !== id)))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={nameFilter} onChange={handleFilterChange}/></div>
      <NewPerson submitHandler={addNumber} newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Numbers phonebook={filteredPersons} handleDeletion={handleDeletion} />
    </div>
  )
}

export default App