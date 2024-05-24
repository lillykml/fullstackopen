const Search = ({searchTerm, searchHandler}) => {
    return(
    <>
    <label>find countries</label>
    <input value={searchTerm} onChange={searchHandler} />
    </>)
}

export default Search