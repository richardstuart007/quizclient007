//
//  Libraries
//
import { ExitToApp } from '@mui/icons-material'
//
//  Common Sub Components
//
import QuizPageHeader from '../Common/QuizPageHeader'
import QuizInfo from '../Common/QuizInfo'

//===================================================================================
const QuizGoodbye = () => {
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
