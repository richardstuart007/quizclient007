//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Container, Grid } from '@mui/material'
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
  email: 'test@gmail.com'
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
    ValtioStore.v_TestData = true
    ValtioStore.v_Page = 'QuizSelect'
    ValtioStore.v_Email = email
    ValtioStore.v_Name = name
    ValtioStore.v_Reset = true
    ValtioStore.v_Owner = 'TestOwner'
    ValtioStore.v_Group1 = 'TestGroup1'
    ValtioStore.v_Group2 = 'TestGroup2'
    ValtioStore.v_Data = QUESTIONS_DATA
    if (g_log1) console.log(QUESTIONS_DATA)
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
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
              title='Test Sign In'
              subTitle='Go straight to Quiz'
              icon={<Accessibility fontSize='large' />}
            />

            {/*.................................................................................................*/}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MyTextField name='name' label='name' />
              </Grid>
              <Grid item xs={12}>
                <MyTextField name='email' label='email' />
              </Grid>

              {/*.................................................................................................*/}
              <Grid item xs={12}>
                <Controls.MyButton
                  type='submit'
                  text='TestQuiz'
                  value='Submit'
                />
                <Controls.MyButton
                  text='Signin'
                  onClick={() => {
                    ValtioStore.v_Page = 'QuizSignin'
                  }}
                />
                <Controls.MyButton
                  text='Register'
                  onClick={() => {
                    ValtioStore.v_Page = 'QuizRegister'
                  }}
                />
                <Controls.MyButton
                  text='Settings'
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
  )
}

export default QuizTest
