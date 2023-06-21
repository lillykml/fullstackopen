import axios from "axios"

const base_url = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(base_url)
}

const create = newPerson => {
    return axios.post(base_url, newPerson)
}

const deletePerson = personID => {
    return axios.delete(`${base_url}/${personID}`)
}

export default { getAll, create, deletePerson }