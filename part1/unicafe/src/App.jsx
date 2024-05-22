import { useState } from 'react'


const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}


const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const sumFeedback = () => good + neutral + bad
  const calculateAverage = () => (good*1 + bad*-1) / sumFeedback()
  const shareGood = () => {
    const share = good / sumFeedback()
    const percentage = (share* 100).toFixed(1) + '%'
    return percentage
  }

  if (good == 0 && neutral == 0 && bad == 0) return <p>No feedback given</p>

  return(
    <table>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={sumFeedback()} />
      <StatisticsLine text="average" value={calculateAverage()} />
      <StatisticsLine text="positive" value={shareGood()} />
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <>
    <h1>give feedback</h1>
    <Button onClick={() => setGood(good+1)} text="good"/>
    <Button onClick={() => setNeutral(neutral+1)} text="neutral"/>
    <Button onClick={() => setBad(bad+1)} text="bad"/>
    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App