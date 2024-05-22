const Total = ({parts}) => {
    return(
        <p>Total of {parts.reduce((s,p) => s + p.exercises, 0)} exercises</p>
    )
}

export default Total