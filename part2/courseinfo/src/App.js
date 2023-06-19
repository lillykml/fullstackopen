import Course from "./components/Course"

//receives an array of course objects
const App = ({courses}) => {
  return(
    <>{courses.map((course) => {
      return <Course key={course.id} course={course}/>
    })}</>
  )
}

export default App