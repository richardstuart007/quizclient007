//
//  Libraries
//
import { Typography, Box } from '@mui/material'
//
//  Components
//
import QuizReviewCard from './QuizReviewCard'
//===================================================================================
export default function QuizReviewPanel({ quizRow, quizanswer }) {
  const { qanswer_correct, qanswer_bad1, qanswer_bad2, qanswer_bad3 } = quizRow
  let Ans = []
  Ans.push(qanswer_bad1)
  Ans.push(qanswer_bad2)
  Ans.push(qanswer_bad3)

  console.log(quizanswer)

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
