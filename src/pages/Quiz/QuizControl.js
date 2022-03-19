//
//  Libraries
//
import { useSnapshot } from 'valtio'
//
//  Sub Components
//
import QuizTest from './QuizPages/QuizTest/QuizTest'
import QuizRegister from './QuizPages/QuizRegister/QuizRegister'
import QuizSignin from './QuizPages/QuizSignin/QuizSignin'
import QuizSelect from './QuizPages/QuizSelect/QuizSelect'
import Quiz from './QuizPages/Quiz/Quiz'
import QuizResults from './QuizPages/QuizResults/QuizResults'
import QuizReview from './QuizPages/QuizReview/QuizReview'
import QuizGoodbye from './QuizPages/QuizGoodbye/QuizGoodbye'
//
//  Utilities
//
import { ValtioStore } from './ValtioStore'
//
//  Debug logging
//
const g_log1 = true
//===================================================================================
function QuizControl() {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Retrieve the state
  //
  const page = snapShot.v_Page
  if (g_log1) console.log('Page: ', page)
  //
  //  Present the selected component
  //
  switch (page) {
    case 'QuizTest':
      return <QuizTest />
    case 'QuizRegister':
      return <QuizRegister />
    case 'QuizSignin':
      return <QuizSignin />
    case 'QuizSelect':
      return <QuizSelect />
    case 'Quiz':
      return <Quiz />
    case 'QuizResults':
      return <QuizResults />
    case 'QuizReview':
      return <QuizReview />
    case 'QuizGoodbye':
      return <QuizGoodbye />
    default:
      return <p>error</p>
  }
}

export default QuizControl
