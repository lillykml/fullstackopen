const Entry = ({name, number, handleDeletion}) => {
    return(
        <>
        <p>{name} {number}
        <button onClick={handleDeletion}>Delete</button>
        </p>
        </>
    )
}

export default Entry