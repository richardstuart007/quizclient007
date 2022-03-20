//
//  Libraries
//
import { useState, useEffect } from 'react'
import { LinearProgress, Typography, Box } from '@mui/material'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = false
//===================================================================================
const QuizLinearProgress = props => {
  const { count, total, text } = props

  //
  //  State
  //
  const [progress, setProgress] = useState(0)
  //
  //  Set active step
  //
  useEffect(() => {
    if (total > 0) setProgress(Math.round((100 * count) / total))
  }, [count, total])

  if (g_log1) console.log('count ', count)
  if (g_log1) console.log('total ', total)
  if (g_log1) console.log('progress ', progress)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant='subtitle2'>{text}</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant='determinate' value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant='body2'
            color='textSecondary'
          >{`${progress}%`}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default QuizLinearProgress
