import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/CodeReview.css'

function CodeReview() {
  const [currentEmail, setEmail] = useState("example@union.edu");
  const [classList, setClassList] = useState(null);
  cosnt [currentAssignment, setAssignment] = useState(null);

  return (
    <>
      {currentEmail === null &&  <Login setEmail = {setEmail} />}
      <AssignmentView currentAssignment={currentAssignment} />
    </>
  )
}

export default CodeReview
