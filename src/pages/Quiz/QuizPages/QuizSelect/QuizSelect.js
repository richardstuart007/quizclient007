//
//  Libraries
//
import { useState } from 'react'
import { Formik, Form } from 'formik'
import { Container, Grid, Typography } from '@mui/material'
import { Storage } from '@mui/icons-material'
//
//  Sub Components
//
import QuizSelectGetData from './QuizSelectGetData'
import * as QuizServices from './QuizServices'
//
//  Common Sub Components
//
import { useQForm, QForm } from '../../useQForm'
import QuizPageHeader from '../Common/QuizPageHeader'
//
//  Controls
//
import MyQueryPromise from '../../../../components/controls/MyQueryPromise'
import Controls from '../../../../components/controls/Controls'
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
const g_log1 = true
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialFValues = {
  qowner: 'public',
  qgroup1: '',
  qgroup2: ''
}
//
//  Saved Values on Submit
//
const savedValues = {
  qowner: '',
  qgroup1: '',
  qgroup2: ''
}

//===================================================================================
function QuizSelect() {
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    console.log(fieldValues)
    let temp = { ...errors }
    if ('qowner' in fieldValues)
      temp.qowner =
        fieldValues.qowner.length !== 0 ? '' : 'This field is required.'
    if ('qgroup1' in fieldValues)
      temp.qgroup1 =
        fieldValues.qgroup1.length !== 0 ? '' : 'This field is required.'
    setErrors({
      ...temp
    })

    if (fieldValues === values) return Object.values(temp).every(x => x === '')
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  //
  //  Validate
  //
  const onSubmitForm = e => {
    if (validate()) {
      handleSubmit()
    }
  }
  //
  //  Valid - Process
  //
  const handleSubmit = () => {
    if (g_log1) console.log(values)
    //
    //  Save data
    //
    savedValues.qowner = values.qowner
    savedValues.qgroup1 = values.qgroup1
    savedValues.qgroup2 = values.qgroup2
    //
    //  Process promise
    //
    var myPromise = MyQueryPromise(QuizSelectGetData(savedValues))
    //
    //  Initial status
    //
    if (g_log1) console.log('Initial pending:', myPromise.isPending()) //true
    if (g_log1) console.log('Initial fulfilled:', myPromise.isFulfilled()) //false
    if (g_log1) console.log('Initial rejected:', myPromise.isRejected()) //false
    //
    //  Resolve Status
    //
    myPromise.then(function (data) {
      if (g_log1) console.log('data ', data)
      if (g_log1) console.log('myPromise ', myPromise)
      if (g_log1) console.log('Final fulfilled:', myPromise.isFulfilled()) //true
      if (g_log1) console.log('Final rejected:', myPromise.isRejected()) //false
      if (g_log1) console.log('Final pending:', myPromise.isPending()) //false
      //
      //  No data
      //
      if (!data) {
        setForm_message('No data found')
      }
      //
      //  Next Step - update store
      //
      else {
        ValtioStore.v_Page = 'Quiz'
        ValtioStore.v_Reset = true
        ValtioStore.v_Owner = savedValues.qowner
        ValtioStore.v_Group1 = savedValues.qgroup1
        ValtioStore.v_Group2 = savedValues.qgroup2
        if (g_log1) console.log('ValtioStore.v_Page ', ValtioStore.v_Page)
        if (g_log1) console.log('v_Reset ', ValtioStore.v_Reset)
        return
      }
    })
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Interface to Form
  //
  const { values, setValues, errors, setErrors, handleInputChange } = useQForm(
    initialFValues,
    true,
    validate
  )

  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <Grid container>
      <Container>
        <Formik
          initialValues={initialFValues}
          onSubmit={onSubmitForm}
          enableReinitialize
        >
          <Form>
            <QuizPageHeader
              title='Question Selection'
              subTitle='Select the question data-set'
              icon={<Storage fontSize='large' />}
            />
            <QForm>
              <Grid container spacing={2}>
                {/*.................................................................................................*/}
                <Grid item xs={6}>
                  <Controls.MySelect
                    name='qowner'
                    label='Owner'
                    value={values.qowner}
                    onChange={handleInputChange}
                    options={QuizServices.getOwnerCollection()}
                    error={errors.qowner}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controls.MySelect
                    name='qgroup1'
                    label='Group1'
                    value={values.qgroup1}
                    onChange={handleInputChange}
                    options={QuizServices.getGroup1Collection()}
                    error={errors.qgroup1}
                  />
                  <Controls.MySelect
                    name='qgroup2'
                    label='Group2'
                    value={values.qgroup2}
                    onChange={handleInputChange}
                    options={QuizServices.getGroup2Collection()}
                  />
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
                    text='Start Quiz'
                    value='Submit'
                  />
                </Grid>
              </Grid>
            </QForm>
          </Form>
        </Formik>
      </Container>
    </Grid>
  )
}

export default QuizSelect
