import Entry from "./Entry"

const Numbers = ({phonebook, handleDeletion}) => {
    return (
        <>
        <h2>Numbers</h2>
        {phonebook.map(person => <Entry key={person.id} name={person.name} number={person.number} 
        handleDeletion={()=>handleDeletion(person.id)}/>)}
        </>
    )
}

export default Numbers