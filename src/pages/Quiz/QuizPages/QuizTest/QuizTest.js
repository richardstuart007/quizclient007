//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Container, Grid, Typography } from '@mui/material'
import { Accessibility } from '@mui/icons-material'
//
//  Controls
//
import Controls from '../../../../components/controls/Controls'
import MyTextField from '../../../../components/controls/MyTextField'
//
//  Common Sub Components
//
import QuizPageHeader from '../Common/QuizPageHeader'
import QuizInfo from '../Common/QuizInfo'
//
//  Utilities
//
import { ValtioStore } from '../../ValtioStore'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const { QUESTIONS_DATA } = require('./QuizTestData.js')
//
//  Debug logging
//
let g_log1 = false
//
//  Initial Values
//
const initialValues = {
  name: 'Test',
  email: 'Test@gmail.com'
}
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  email: Yup.string().email().required('Required'),
  name: Yup.string().required('Required')
})
//===================================================================================
function QuizTest() {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Set Debug State
  //
  g_log1 = snapShot.v_Log
  if (g_log1) console.log('Start QuizTest')
  //
  //  TestData ?
  //
  const g_TestData = snapShot.v_TestData
  if (g_log1) console.log('g_TestData ', g_TestData)
  //
  //  Subtitle
  //
  let g_subTitle
  g_TestData
    ? (g_subTitle = `Static Data no need to change name(${initialValues.name}) and email(${initialValues.email})`)
    : (g_subTitle = `SignIn to start Quiz`)
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = values => {
    //
    //  Deconstruct values
    //
    const { email, name } = values
    //
    //  Update Store
    //
    ValtioStore.v_Page = 'QuizSelect'
    ValtioStore.v_Email = email
    ValtioStore.v_Name = name
    ValtioStore.v_Reset = true
    ValtioStore.v_Data = QUESTIONS_DATA
    if (g_log1) console.log(QUESTIONS_DATA)
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Grid container>
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
            enableReinitialize
          >
            <Form>
              <QuizPageHeader
                title='Test SignIn'
                subTitle={g_subTitle}
                icon={<Accessibility fontSize='large' />}
              />
              {/*.................................................................................................*/}
              <Grid container spacing={2}>
                {g_TestData ? (
                  <Grid item xs={12}>
                    <MyTextField name='name' label='name' />
                  </Grid>
                ) : null}
                {g_TestData ? (
                  <Grid item xs={12}>
                    <MyTextField name='email' label='email' />
                  </Grid>
                ) : null}
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  {g_TestData ? (
                    <Controls.MyButton
                      type='submit'
                      text='Signin'
                      value='Submit'
                    />
                  ) : null}
                  {g_TestData ? null : (
                    <Controls.MyButton
                      text='Signin'
                      onClick={() => {
                        ValtioStore.v_Page = 'QuizSignin'
                      }}
                    />
                  )}

                  <Typography variant='subtitle2' gutterBottom>
                    Navigation
                  </Typography>

                  {g_TestData ? null : (
                    <Controls.MyButton
                      text='Register'
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        ValtioStore.v_Page = 'QuizRegister'
                      }}
                    />
                  )}
                  <Controls.MyButton
                    text='Settings'
                    variant='outlined'
                    color='secondary'
                    onClick={() => {
                      ValtioStore.v_Page = 'QuizSettings'
                    }}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
      <QuizInfo />
    </>
  )
}

export default QuizTest
