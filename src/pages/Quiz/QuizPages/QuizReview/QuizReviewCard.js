//
//  Libraries
//
import { Card, CardContent, Typography, Box } from '@mui/material'

export default function QuizReviewCard({ field, backgroundColor }) {
  if (!field) return null
  return (
    <div className='answer'>
      <Box sx={{ m: 2 }}>
        <Card elevation={1} style={{ backgroundColor: backgroundColor }}>
          <CardContent>
            <Typography variant='body2'>{field}</Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}
