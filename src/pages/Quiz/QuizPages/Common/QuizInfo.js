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
  let DataSource
  snapShot.v_TestData === true
    ? (DataSource = 'Static')
    : (DataSource = 'Server')

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
              <Box borderBottom={1}>{`Selection (${DataSource})`}</Box>
              {{ owner } ? <Box>{owner}</Box> : null}
              {{ group1 } ? <Box>{group1}</Box> : null}
              {{ group2 } ? <Box>{group2}</Box> : null}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}

export default QuizInfo
