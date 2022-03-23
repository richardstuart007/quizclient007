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
let g_log1 = false
//
//  Global store variables
//
let g_Idx = 0
let g_quizQuest = []
let g_questCount = 0
let g_quizRow = {}
//===================================================================================
const Quiz = () => {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Set Debug State
  //
  g_log1 = snapShot.v_Log
  if (g_log1) console.log('Start Quiz')
  //
  //  Define the State variables
  //
  const [ansPass, setAnsPass] = useState(0)
  const [ansCount, setAnsCount] = useState(0)
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
    if (g_log1) console.log('snapShot.v_Quest ', snapShot.v_Quest)
    let quest = []
    snapShot.v_Quest.forEach(row => {
      const rowData = { ...row }
      if (g_log1) console.log('rowData ', rowData)
      quest.push(rowData)
    })
    //
    // Update Questions from Store
    //
    g_quizQuest = quest
    g_questCount = quest.length
    g_Idx = 0
    g_quizRow = g_quizQuest[g_Idx]
    if (g_log1) console.log('g_quizQuest ', g_quizQuest)
    if (g_log1) console.log('g_questCount ', g_questCount)
    if (g_log1) console.log('g_quizRow ', g_quizRow)
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
    if (g_log1) console.log('g_Idx ', g_Idx, 'id ', id)
    if (id === 1) {
      const nextAnsPass = ansPass + 1
      setAnsPass(nextAnsPass)
    }
    //
    //   Write Answers
    //
    if (g_log1) console.log('g_Idx ', g_Idx, 'id ', id)
    ValtioStore.v_Ans[g_Idx] = id
    const nextAnsCount = ansCount + 1
    setAnsCount(nextAnsCount)
    if (g_log1) console.log('nextAnsCount ', nextAnsCount)
    //
    //  End of data
    //
    if (g_Idx + 1 >= g_questCount) {
      if (g_log1) console.log('v_Ans', snapShot.v_Ans)
      ValtioStore.v_Page = 'QuizResults'
      return
    }
    //
    //  Next row
    //
    g_Idx++
    g_quizRow = g_quizQuest[g_Idx]
    if (g_log1) console.log('g_quizRow', g_quizRow)
  }
  //...................................................................................
  //. Answer Selected
  //...................................................................................
  const handleSelect = id => {
    if (g_log1) console.log(`ID selected ${id}`)
    if (g_log1) console.log('g_Idx ', g_Idx, 'qid ', g_quizRow.qid)
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
  //  No data (Error)
  //
  if (g_questCount === 0) {
    if (g_log1) console.log('No data')
    return <p style={{ color: 'red' }}>No data</p>
  }
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
      <QuizHeader quizRow={g_quizRow} quizQuestion={g_Idx + 1} />

      <QuizPanel
        key={g_quizRow.qid}
        quizRow={g_quizRow}
        handleSelect={handleSelect}
      />
      <QuizHyperlinks quizRow={g_quizRow} />
      <QuizLinearProgress
        count={ansCount}
        total={g_questCount}
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
          text='Results'
          color='secondary'
          variant='outlined'
          onClick={() => {
            ValtioStore.v_Page = 'QuizResults'
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

export default Quiz
