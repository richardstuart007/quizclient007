//
//  Libraries
//
import { Typography, Button, Box } from '@mui/material'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = false
//===================================================================================
const QuizHyperlinks = ({ quizRow }) => {
  //
  //  Deconstruct row
  //
  const { qhyperlink1, qhyperlink2 } = quizRow
  if (g_log1) console.log('quizRow ', quizRow)
  if (g_log1) console.log('qhyperlink1 ', qhyperlink1)
  if (g_log1) console.log('qhyperlink2 ', qhyperlink2)
  //
  //  Empty links
  //
  if (!qhyperlink1 && !qhyperlink2) {
    return null
  }
  //
  //  Hyperlink open
  //
  const openTab = hyperlink => () => {
    if (g_log1) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <>
      <Box>
        <Typography variant='subtitle2' gutterBottom>
          Help Articles
        </Typography>
        {qhyperlink1 && (
          <Button
            onClick={openTab(qhyperlink1)}
            type='submit'
            style={{ color: 'blue' }}
            variant='outlined'
            size='small'
          >
            Article1
          </Button>
        )}

        {qhyperlink2 && (
          <Button
            onClick={openTab(qhyperlink2)}
            type='submit'
            style={{ color: 'blue' }}
            variant='outlined'
            size='small'
          >
            Article2
          </Button>
        )}
      </Box>
    </>
  )
}

export default QuizHyperlinks
