//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Typography, Box } from '@mui/material'
//
//  Components
//
import QuizReviewCard from './QuizReviewCard'
//
//  Utilities
//
import { ValtioStore } from '../../ValtioStore'
//
//  Debug logging
//
let g_log1 = false
//===================================================================================
export default function QuizReviewPanel({ quizRow, quizanswer }) {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Set Debug State
  //
  g_log1 = snapShot.v_Log
  if (g_log1) console.log('Start QuizReviewPanel')
  //
  //  Deconstruct
  //
  const { qanswer_correct, qanswer_bad1, qanswer_bad2, qanswer_bad3 } = quizRow
  let Ans = []
  Ans.push(qanswer_bad1)
  Ans.push(qanswer_bad2)
  Ans.push(qanswer_bad3)

  if (g_log1) console.log(quizanswer)

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography variant='subtitle2' gutterBottom style={{ color: 'green' }}>
          Answer
        </Typography>

        <QuizReviewCard
          key={1}
          field={qanswer_correct}
          backgroundColor={quizanswer === 1 ? 'green' : 'white'}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        {quizanswer === 1 ? (
          <Typography
            variant='subtitle2'
            gutterBottom
            style={{ color: 'green' }}
          >
            Your Answer is CORRECT
          </Typography>
        ) : (
          <Typography variant='subtitle2' gutterBottom style={{ color: 'red' }}>
            YOUR answer is INCORRECT
          </Typography>
        )}

        {Ans.map((answer, index) => (
          <QuizReviewCard
            key={index + 1}
            field={answer}
            backgroundColor={quizanswer - 2 === index ? 'red' : 'white'}
          />
        ))}
      </Box>
    </>
  )
}
