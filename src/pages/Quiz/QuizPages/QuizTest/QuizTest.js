//
//  Libraries
//
import { useState } from 'react'
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
//.............................................................................
//.  Data Input Fields
//.............................................................................
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
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
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
    ValtioStore.v_Page = 'Quiz'
    ValtioStore.v_Email = email
    ValtioStore.v_Name = name
    ValtioStore.v_Reset = true
    ValtioStore.v_Owner = 'TestOwner'
    ValtioStore.v_Group1 = 'TestGroup1'
    ValtioStore.v_Group2 = 'TestGroup2'
    ValtioStore.v_Quest = QUESTIONS_DATA
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
                <Typography style={{ color: 'red' }}>{form_message}</Typography>
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
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Container>
    </Grid>
  )
}

export default QuizTest
