//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Container, Grid, Typography } from '@mui/material'
import { HowToReg } from '@mui/icons-material'
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
const { URL_BASE } = require('../../../../services/constants.js')
const { URL_REGISTER } = require('../../../../services/constants.js')
const sqlClient = 'Quiz/Register'
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialValues = {
  name: '',
  email: '',
  password: ''
}
//
// Debugging
//
let g_log1 = false
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required')
})
//===================================================================================
function QuizRegister() {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Set Debug State
  //
  g_log1 = snapShot.v_Log
  if (g_log1) console.log('Start QuizRegister')
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //...................................................................................
  //. Form Submit
  //...................................................................................
  const onSubmitForm = (values, submitProps) => {
    //
    //  Deconstruct values
    //
    const { name, email, password } = values
    //
    //  Post to server
    //
    const URL = URL_BASE + URL_REGISTER
    fetch(URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sqlClient: sqlClient,
        email: email,
        password: password,
        name: name
      })
    })
      .then(response => response.json())

      .then(user => {
        if (user.id) {
          // setId(user.id)
          setForm_message(`Data updated in Database with ID(${user.id})`)
          ValtioStore.v_Page = 'QuizSignin'
        } else {
          setForm_message('User not registered')
        }
      })
      .catch(err => {
        setForm_message(err.message)
      })
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
                title='Register'
                subTitle='Register a new user'
                icon={<HowToReg fontSize='large' />}
              />
              <Grid container spacing={2}>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <MyTextField name='name' label='name' />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField name='email' label='email' />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField name='password' label='password' />
                </Grid>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <Typography style={{ color: 'red' }}>
                    {form_message}
                  </Typography>
                </Grid>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <Controls.MyButton
                    type='submit'
                    text='Register'
                    value='Submit'
                  />

                  <Typography variant='subtitle2' gutterBottom>
                    Navigation
                  </Typography>

                  <Controls.MyButton
                    text='Signin'
                    variant='outlined'
                    color='secondary'
                    onClick={() => {
                      ValtioStore.v_Page = 'QuizSignin'
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

export default QuizRegister
