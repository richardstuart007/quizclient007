//
//  Libraries
//
import { useState, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { Typography, Box } from '@mui/material'
import { ShowChart } from '@mui/icons-material'
//
//  Controls
//
import Controls from '../../../../components/controls/Controls'
//
//  Common Sub Components
//
import QuizPageHeader from '../Common/QuizPageHeader'
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
const QuizResults = () => {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Set Debug State
  //
  g_log1 = snapShot.v_Log
  if (g_log1) console.log('Start QuizResults')
  //
  //  Define the State variables
  //
  const [ansPass, setAnsPass] = useState(0)
  const [ansCount, setAnsCount] = useState(0)
  const [mark, setMark] = useState(0)
  //...................................................................................
  //.  First time data received
  //...................................................................................
  const firstLoad = () => {
    if (g_log1) console.log('firstLoad')
    //
    //  Get store data - Answers
    //
    let AnsPass = 0
    let Ans = []
    snapShot.v_Ans.forEach(id => {
      Ans.push(id)
      if (id === 1) AnsPass++
    })
    if (g_log1) console.log('Ans ', Ans)
    const AnsCount = Ans.length
    setAnsCount(AnsCount)
    setAnsPass(AnsPass)
    //
    //  Mark%
    //
    if (AnsCount > 0) setMark(Math.round((100 * AnsPass) / AnsCount))
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
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <QuizPageHeader
        title='Quiz Results'
        subTitle='Click Review to verify your answers'
        icon={<ShowChart fontSize='large' />}
      />
      <Box>
        <Typography variant='subtitle1' gutterBottom>
          Result ({mark}%) {ansPass} out of {ansCount}
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Controls.MyButton
          type='submit'
          text='Review'
          color='primary'
          variant='contained'
          onClick={() => {
            ValtioStore.v_Page = 'QuizReview'
          }}
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
            ValtioStore.v_Page = 'Quiz'
            ValtioStore.v_Reset = true
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

export default QuizResults
