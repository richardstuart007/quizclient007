//
//  Libraries
//
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
// Styles
//
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'pink'
  },
  cardHover: {
    '&:hover': {
      backgroundColor: 'yellow'
    }
  }
}))
//===================================================================================
export default function QuizPanelCard({ answer, handleSelect }) {
  //
  // Styles
  //
  const classes = useStyles()
  //.............................................................................
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Card elevation={1} className={`${classes.cardHover} ${classes.root}`}>
          <CardActionArea>
            <CardContent onClick={() => handleSelect(answer.id)}>
              <Typography variant='body2' color='textSecondary'>
                {answer.details}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  )
}
