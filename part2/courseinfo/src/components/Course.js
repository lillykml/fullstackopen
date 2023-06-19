const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
    return(
        <p>Number of exercises {parts.reduce((a,c) => {
            console.log("a: ", a.exercises)
            console.log("c: ", c.exercises)
            return (a+c.exercises)}, 0)}</p>
    )
}

const Part = ({ name, exercises }) => {
    return(
        <p>{name} {exercises}</p>
    )
}

const Content = ({ parts }) => 
  <>
  {parts.map((part) => (<Part key={part.id} name={part.name} exercises={part.exercises}/>)) }
  </>

const Course = ({course}) => {
    return(
        <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
        </>
    )
}

export default Course