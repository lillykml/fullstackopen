import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandler = () => setGood(good + 1)
  const neutralClickHandler = () => setNeutral(neutral + 1)
  const badClickHandler = () => setBad(bad + 1)

  return (
    <>
    <Title text="give feedback"/>
    <Button text="Good" clickHandler={goodClickHandler}/>
    <Button text="Neutral" clickHandler={neutralClickHandler}/>
    <Button text="Bad" clickHandler={badClickHandler}/>
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

const Title = ({text}) => {
  return(<h1>{text}</h1>)}

const Button = ({text, clickHandler}) => {
  return(
    <button onClick={clickHandler}>{text}</button>
  )}

const StatisticsLine = ({text, value}) => {
  return(<p>{text}: {value}</p>)
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return(
      <>
      <Title text="Statistics"/>
      <p>No feedback given</p>
      </>
    )
  }
  return(
    <>
    <Title text="Statistics"/>
    <StatisticsLine text="Good" value={good}/>
    <StatisticsLine text="Neutral" value={neutral}/>
    <StatisticsLine text="Bad" value={bad}/>
    <StatisticsLine text="All" value={all}/>
    <StatisticsLine text="Average" value={average}/>
    <StatisticsLine text="Positive" value={positive + "%"}/>
    </>
  )
}

export default App