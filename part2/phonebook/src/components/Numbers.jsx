const Numbers = ({phonebook}) => {
    return (
        <>
        <h2>Numbers</h2>
        {phonebook.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Numbers