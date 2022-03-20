//
//  Libraries
//
import { ExitToApp } from '@mui/icons-material'
//
//  Common Sub Components
//
import QuizPageHeader from '../Common/QuizPageHeader'
import QuizInfo from '../Common/QuizInfo'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = false
//===================================================================================
const QuizGoodbye = () => {
  if (g_log1) console.log('Start QuizGoodbye')
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <QuizPageHeader
        title='Quiz Goodbye'
        subTitle='Close the browser to end'
        icon={<ExitToApp fontSize='large' />}
      />

      <QuizInfo />
    </>
  )
}

export default QuizGoodbye
