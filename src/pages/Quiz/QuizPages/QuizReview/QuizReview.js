//
//  Libraries
//
import { useState, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { Typography, Box } from '@mui/material'
import { Visibility } from '@mui/icons-material'
//
//  Controls
//
import Controls from '../../../../components/controls/Controls'
//
//  Sub Components
//
import QuizReviewPanel from './QuizReviewPanel'
//
//  Common Components
//
import QuizPageHeader from '../Common/QuizPageHeader'
import QuizHeader from '../Common/QuizHeader'
import QuizHyperlinks from '../Common/QuizHyperlinks'
import QuizInfo from '../Common/QuizInfo'
//
//  Utilities
//
import { ValtioStore } from '../../ValtioStore'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
let g_log1 = false
//===================================================================================
const QuizReview = () => {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Set Debug State
  //
  g_log1 = snapShot.v_Log
  if (g_log1) console.log('Start QuizReview')
  //
  //  Define the State variables
  //
  const [ansPass, setAnsPass] = useState(0)
  const [ansCount, setAnsCount] = useState(0)
  const [mark, setMark] = useState(0)
  const [quizRow, setQuizRow] = useState(null)
  const [rowIdx, setRowIdx] = useState(0)
  const [quizQuest, setQuizQuest] = useState([])
  const [quizAns, setQuizAns] = useState([])
  //...................................................................................
  //.  First time data received
  //...................................................................................
  const firstLoad = () => {
    if (g_log1) console.log('firstLoad ')
    //
    //  Initialise global variables
    //
    if (g_log1) console.log('Initialise global variables')
    //
    //  Get store data - Questions
    //
    let quest = []
    snapShot.v_Quest.forEach(row => {
      const rowData = { ...row }
      quest.push(rowData)
    })
    if (g_log1) console.log('quest ', quest)
    setQuizQuest(quest)
    //
    //  Get store data - Answers
    //
    let Ans = []
    let AnsPass = 0
    snapShot.v_Ans.forEach(id => {
      Ans.push(id)
      if (id === 1) AnsPass++
    })
    if (g_log1) console.log('Ans ', Ans)
    const AnsCount = Ans.length
    setAnsCount(AnsCount)
    setAnsPass(AnsPass)
    setQuizAns(Ans)
    //
    //  Mark%
    //
    if (AnsCount > 0) setMark(Math.round((100 * AnsPass) / AnsCount))
    //
    // Start at row 0
    //
    if (g_log1) console.log('quest[0] ', quest[0])
    setRowIdx(0)
    setQuizRow(quest[0])
  }
  //...................................................................................
  //.  Next Question
  //...................................................................................
  const nextQuestion = () => {
    if (g_log1) console.log('nextQuestion ')
    if (g_log1) console.log(quizQuest)
    //
    //  More rows
    //
    if (g_log1) console.log(rowIdx, ansCount)
    if (rowIdx + 1 < ansCount) {
      const RowIdx = rowIdx + 1
      setRowIdx(RowIdx)
      setQuizRow(quizQuest[RowIdx])
    }
  }
  //...................................................................................
  //.  Previous Question
  //...................................................................................
  const handlePrevious = () => {
    if (g_log1) console.log('Previous Question ')
    //
    //  More rows
    //
    if (rowIdx > 0) {
      const RowIdx = rowIdx - 1
      setRowIdx(RowIdx)
      setQuizRow(quizQuest[RowIdx])
    }
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Load the data array from the store
  //
  useEffect(() => {
    firstLoad()
    // eslint-disable-next-line
  }, [])
  //
  //  No data
  //
  if (!quizRow) {
    if (g_log1) console.log('Quiz Row empty')
    return <p style={{ color: 'red' }}>Quiz Row empty</p>
  }
  //
  //  Deconstruct row
  //
  if (g_log1) console.log('quizRow ', quizRow)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <QuizPageHeader
        title='Quiz Review'
        subTitle='Use the Previous/Next buttons'
        icon={<Visibility fontSize='large' />}
      />
      <Box>
        <Typography variant='subtitle1'>
          Result ({mark}%) {ansPass} out of {ansCount}
        </Typography>
      </Box>

      <QuizHeader quizRow={quizRow} quizQuestion={rowIdx + 1} />
      <QuizReviewPanel quizRow={quizRow} quizanswer={quizAns[rowIdx]} />
      <QuizHyperlinks quizRow={quizRow} />

      <Box sx={{ mt: 2 }}>
        <Controls.MyButton
          type='submit'
          text='Previous'
          color='primary'
          variant='contained'
          onClick={() => handlePrevious()}
        />

        <Controls.MyButton
          type='submit'
          text='Next'
          color='primary'
          variant='contained'
          onClick={() => nextQuestion()}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant='subtitle2' gutterBottom>
          Navigation
        </Typography>
        <Controls.MyButton
          type='submit'
          text='Restart'
          color='secondary'
          variant='outlined'
          onClick={() => {
            ValtioStore.v_Reset = true
            ValtioStore.v_Page = 'Quiz'
          }}
        />
        <Controls.MyButton
          type='submit'
          text='NewQuiz'
          color='secondary'
          variant='outlined'
          onClick={() => {
            ValtioStore.v_Page = 'QuizSelect'
          }}
        />
        <Controls.MyButton
          type='submit'
          text='Quit'
          color='secondary'
          variant='outlined'
          onClick={() => {
            ValtioStore.v_Page = 'QuizGoodbye'
          }}
        />
      </Box>
      <QuizInfo />
    </>
  )
}

export default QuizReview
