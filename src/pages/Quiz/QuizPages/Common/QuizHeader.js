//
//  Libraries
//
import { Typography, Box } from '@mui/material'
import { teal } from 'material-ui-colors'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = false
//===================================================================================
const QuizHeader = ({ quizRow, quizQuestion }) => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Deconstruct row
  //
  if (g_log1) console.log('quizRow ', quizRow)
  const { qdetail } = quizRow
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <div>
      <Box>
        <Typography
          variant='subtitle2'
          gutterBottom
          style={{ color: teal['A700'] }}
        >
          Question {quizQuestion}
        </Typography>

        <Box>
          <Typography variant='h6' style={{ color: 'blue' }} gutterBottom>
            {qdetail}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default QuizHeader
