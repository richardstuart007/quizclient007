//
//  Libraries
//
import { Grid, Box, Container } from '@mui/material'
import { useSnapshot } from 'valtio'
//
//  Utilities
//
import { ValtioStore } from '../../ValtioStore'

//===================================================================================
const QuizInfo = () => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Retrieve the state
  //
  const page = snapShot.v_Page
  const name = snapShot.v_Name
  const email = snapShot.v_Email
  const owner = snapShot.v_Owner
  const group1 = snapShot.v_Group1
  const group2 = snapShot.v_Group2
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <footer>
      <Box bgcolor='DodgerBlue' color='white' sx={{ p: 2, mt: 2 }}>
        <Container maxWidth='lg'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Page</Box>
              <Box>{page}</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>User</Box>
              <Box>{name}</Box>
              <Box>{email}</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Selection</Box>
              <Box>{owner}</Box>
              <Box>{group1}</Box>
              <Box>{group2}</Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}

export default QuizInfo
