import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import NewPerson from './components/NewPerson'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState(null)


  useEffect(() => {
    phonebookService.getAll()
    .then(response => {
      setPersons(response.data)
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

  const clearMessage = () => {
    setTimeout(() => {
    setMessage(null)
  }, 5000)}

  const addNumber = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...existingPerson, number: newNumber} 
        phonebookService
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(p=> p.id !== existingPerson.id ? p : response.data))
          setNewName('')
          setNewNumber('')
          setMessageStatus('successfulMessage')
          setMessage(`Updated ${updatedPerson.name}s number`)
          clearMessage()
        })
        .catch(error => {
          setMessageStatus('errorMessage')
          if (error.response.status === 400) {
            setMessage(`Person validation failed: ${error.response.data.error}`)
          } else {setMessage(`Information of ${updatedPerson.name} has already been removed from the server`)}
          clearMessage()
        })
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      phonebookService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMessageStatus('successfulMessage')
        setMessage(`Added ${newPerson.name}`)
        clearMessage()
      })
      .catch(error => {
        setMessageStatus('errorMessage')
        setMessage(`Person validation failed: ${error.response.data.error}`)
        clearMessage()
      })
    }
  }

  const handleDeletion = (id) => {
    const person = persons.find(n => n.id === id)
    if(confirm(`Delete ${person.name}?`)) {
      phonebookService.deletePerson(id).then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  const byFilterField = p => p.name.toLowerCase().includes(nameFilter.toLowerCase())
  const personsToShow = nameFilter ? persons.filter(byFilterField) : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={messageStatus} />
      <div>filter shown with <input value={nameFilter} onChange={handleFilterChange}/></div>
      <NewPerson submitHandler={addNumber} newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Numbers phonebook={personsToShow} handleDeletion={handleDeletion} />
    </div>
  )
}

export default App