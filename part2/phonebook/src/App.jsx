import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personServices from './services/persons';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')
  const [isError, setIsError] = useState(false)

  const hook = () => {
  console.log('effect')
  personServices.getAll().then(initialPersons => {
    console.log('promise fulfilled')
    setPersons(initialPersons)
  })
  }
  useEffect(hook, [])  

  const handleAddPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      const confirmReplace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmReplace) {
        const personToUpdate = persons.find(p => p.name === newName)
        const updatedPerson = { ...personToUpdate, number: newNumber }
        personServices.update(personToUpdate.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
        })
        setNewName('')
        setNewNumber('')
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personServices.create(newPerson).then(returnedPerson => {
      setPersons([...persons, returnedPerson])
    })
    setNotification(`Added ${newName}`)
    setIsError(false)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personServices.deletePerson(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setNotification(`Deleted ${person.name}`)
        setIsError(false)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).catch(error => {
        setNotification(`Information of ${person.name} has already been removed from server`)
        setIsError(true)
        setPersons(persons.filter(p => p.id !== id))
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const personsToShow = filter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
      {notification && <Notification message={notification} isError={isError} />}
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={handleAddPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={handleDeletePerson} />
    </div>
  )
}

export default App