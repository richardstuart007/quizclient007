//
//  Libraries
//
import { useState } from 'react'
import { useSnapshot } from 'valtio'
import { Typography, Box } from '@mui/material'
import { QuestionAnswer } from '@mui/icons-material'
//
//  Controls
//
import Controls from '../../../../components/controls/Controls'
//
//  Sub Components
//
import QuizPanel from './QuizPanel'
//
//  Common Sub Components
//
import QuizPageHeader from '../Common/QuizPageHeader'
import QuizHeader from '../Common/QuizHeader'
import QuizHyperlinks from '../Common/QuizHyperlinks'
import QuizLinearProgress from '../Common/QuizLinearProgress'
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
const g_log1 = false
//===================================================================================
const Quiz = () => {
  //
  //  Define the State variables
  //
  const [rowIdx, setRowIdx] = useState(0)
  const [quizRow, setQuizRow] = useState(null)
  const [quizQuest, setQuizQuest] = useState([])
  const [questCount, setQuestCount] = useState(0)
  const [ansPass, setAnsPass] = useState(0)
  const [ansCount, setAnsCount] = useState(0)
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //...................................................................................
  //.  Reset the Quiz
  //...................................................................................
  const handleQuizReset = () => {
    //
    //  Reset flag
    //
    if (g_log1) console.log('quizReset')
    ValtioStore.v_Reset = false
    //
    //  Get store data & copy to State
    //
    let quest = []
    snapShot.v_Quest.forEach(row => {
      const rowData = { ...row }
      if (g_log1) console.log('rowData ', rowData)
      quest.push(rowData)
    })
    //
    // Update Questions from Store
    //
    setQuizQuest(quest)
    setQuestCount(quest.length)
    setQuizRow(quest[rowIdx])
    setRowIdx(0)
    //
    // Update Answers
    //
    ValtioStore.v_ResetAns = []
    setAnsPass(0)
    setAnsCount(0)
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = id => {
    //
    //  Update count
    //
    if (g_log1) console.log('rowIdx ', rowIdx, 'id ', id)
    if (id === 1) {
      const nextAnsPass = ansPass + 1
      setAnsPass(nextAnsPass)
    }
    //
    //   Write Answers
    //
    if (g_log1) console.log('rowIdx ', rowIdx, 'id ', id)
    ValtioStore.v_Ans[rowIdx] = id
    const nextAnsCount = ansCount + 1
    setAnsCount(nextAnsCount)
    if (g_log1) console.log('nextAnsCount ', nextAnsCount)
    //
    //  End of data
    //
    if (rowIdx + 1 >= questCount) {
      if (g_log1) console.log('v_Ans', snapShot.v_Ans)
      ValtioStore.v_Page = 'QuizResults'
      return
    }
    //
    //  Next row
    //
    const nextRowIdx = rowIdx + 1
    setRowIdx(nextRowIdx)
    setQuizRow(quizQuest[nextRowIdx])
    if (g_log1) console.log('rowIdx data', rowIdx, quizQuest[rowIdx])
  }
  //...................................................................................
  //. Answer Selected
  //...................................................................................
  const handleSelect = id => {
    if (g_log1) console.log(`ID selected ${id}`)
    if (g_log1) console.log('rowIdx ', rowIdx, 'qid ', quizRow.qid)
    onSubmitForm(id)
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Reset Quiz State
  //
  const reset = snapShot.v_Reset
  if (reset) handleQuizReset()
  //
  //  No data
  //
  if (questCount === 0) {
    if (g_log1) console.log('No data')
    return <p style={{ color: 'red' }}>No data</p>
  }
  if (!quizRow) {
    return <p style={{ color: 'red' }}>Quiz Row empty</p>
  }
  if (g_log1) console.log('quiz row ', quizRow)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <QuizPageHeader
        title='Quiz'
        subTitle='Answer the Quiz Questions'
        icon={<QuestionAnswer fontSize='large' />}
      />
      <QuizHeader quizRow={quizRow} quizQuestion={rowIdx + 1} />

      <QuizPanel
        key={quizRow.qid}
        quizRow={quizRow}
        handleSelect={handleSelect}
      />
      <QuizHyperlinks quizRow={quizRow} />
      <QuizLinearProgress
        count={ansCount}
        total={questCount}
        text={'Progress'}
      />
      <QuizLinearProgress
        count={ansPass}
        total={ansCount}
        text={'Score'}
      ></QuizLinearProgress>

      <Box sx={{ mt: 2 }}>
        <Typography variant='subtitle2' gutterBottom>
          Navigation
        </Typography>

        <Controls.MyButton
          type='submit'
          text='Restart'
          color='primary'
          variant='outlined'
          onClick={() => {
            ValtioStore.v_Reset = true
            ValtioStore.v_Page = 'Quiz'
          }}
        />
        <Controls.MyButton
          type='submit'
          text='NewQuiz'
          color='primary'
          variant='outlined'
          onClick={() => {
            ValtioStore.v_Page = 'QuizSelect'
          }}
        />
        <Controls.MyButton
          type='submit'
          text='Results'
          color='primary'
          variant='outlined'
          onClick={() => {
            ValtioStore.v_Page = 'QuizResults'
          }}
        />

        <Controls.MyButton
          type='submit'
          text='Quit'
          color='primary'
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

export default Quiz
