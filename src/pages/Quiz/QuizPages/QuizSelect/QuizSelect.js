//
//  Libraries
//
import { useState } from 'react'
import { Formik, Form } from 'formik'
import { Container, Grid, Typography } from '@mui/material'
import { Storage } from '@mui/icons-material'
import { useSnapshot } from 'valtio'
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
import QuizRandomSort from '../../../../services/QuizRandomSort'
//
//  Constants
//
const { ROWS_DEFAULT } = require('../../../../services/constants.js')
const { ROWS_MAX } = require('../../../../services/constants.js')
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
  qgroup2: '',
  MaxQuestions: ROWS_DEFAULT
}
//
//  Saved Values on Submit
//
const savedValues = {
  qowner: '',
  qgroup1: '',
  qgroup2: '',
  MaxQuestions: 0
}
//===================================================================================
const QuizSelect = () => {
  if (g_log1) console.log('Start QuizSelect')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    if (g_log1) console.log('fieldValues ', fieldValues)
    let temp = { ...errors }
    if ('qowner' in fieldValues)
      temp.qowner =
        fieldValues.qowner.length !== 0 ? '' : 'This field is required.'
    if ('qgroup1' in fieldValues)
      temp.qgroup1 =
        fieldValues.qgroup1.length !== 0 ? '' : 'This field is required.'
    if ('MaxQuestions' in fieldValues)
      temp.MaxQuestions =
        parseInt(fieldValues.MaxQuestions) > 0 &&
        parseInt(fieldValues.MaxQuestions) <= ROWS_MAX
          ? ''
          : `You must select between 1 and ${ROWS_MAX}.`
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
      updateSelection()
    }
  }
  //...................................................................................
  //.  Update Selection
  //...................................................................................
  const updateSelection = () => {
    //
    //  Save data
    //
    if (g_log1) console.log(values)
    savedValues.qowner = values.qowner
    savedValues.qgroup1 = values.qgroup1
    savedValues.qgroup2 = values.qgroup2
    savedValues.MaxQuestions = values.MaxQuestions
    //
    //  Test mode then filter v_Data to v_Quest, else populate v_Data/v_Quest from server
    //
    snapShot.v_TestData ? filterData() : getServerData()
  }
  //...................................................................................
  //.  Get Data from server
  //...................................................................................
  const getServerData = () => {
    //
    //  Process promise
    //
    if (g_log1) console.log('getServerData')
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
        //
        // Sort Data
        //
        const sortedData = QuizRandomSort(data)
        //
        // update ValtioStore - Questions
        //
        if (g_log1) console.log('update v_Quest', sortedData)
        ValtioStore.v_Quest = sortedData
        //
        //  Update other store values
        //
        updateStore()
      }
    })
  }
  //...................................................................................
  //.  Update Store
  //...................................................................................
  const updateStore = () => {
    if (g_log1) console.log('snapShot.v_Quest', snapShot.v_Quest)
    ValtioStore.v_Page = 'Quiz'
    ValtioStore.v_Reset = true
    ValtioStore.v_Owner = savedValues.qowner
    ValtioStore.v_Group1 = savedValues.qgroup1
    ValtioStore.v_Group2 = savedValues.qgroup2
    ValtioStore.v_MaxQuestions = savedValues.MaxQuestions
  }
  //...................................................................................
  //.  Filter v_Data into v_Quest
  //...................................................................................
  const filterData = () => {
    if (g_log1) console.log('filterData')
    //
    //  Get unfiltered data
    //
    const data = snapShot.v_Data
    if (g_log1) console.log('Data ', data)
    //
    //  Filter
    //
    const filteredData = data.filter(question => {
      if (g_log1)
        console.log(question.qowner, question.qgroup1, question.qgroup2)
      if (g_log1)
        console.log(
          savedValues.qowner,
          savedValues.qgroup1,
          savedValues.qgroup2
        )
      if (savedValues.qowner && question.qowner !== savedValues.qowner)
        return false
      if (savedValues.qgroup1 && question.qgroup1 !== savedValues.qgroup1)
        return false
      if (savedValues.qgroup2 && question.qgroup2 !== savedValues.qgroup2)
        return false
      return question
    })
    //
    //  No data
    //
    if (g_log1) console.log('filteredData ', filteredData)
    if (filteredData.length === 0) {
      setForm_message('QuizSelect: No data found')
      return
    }
    //
    // Sort Data
    //

    const sortedData = QuizRandomSort(filteredData)
    if (g_log1) console.log('sortedData ', sortedData)
    //
    //  Apply max number
    //
    let quest = []
    let i = 0
    do {
      if (i < sortedData.length) quest.push(sortedData[i])
      i++
    } while (i < savedValues.MaxQuestions)
    //
    // update ValtioStore - Questions
    //
    if (g_log1) console.log('update v_Quest', quest)
    ValtioStore.v_Quest = quest
    //
    //  Update other store values
    //
    updateStore()
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Interface to Form
  //
  const { values, errors, setErrors, handleInputChange } = useQForm(
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
                  {/*.................................................................................................*/}
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

                <Grid item xs={6}>
                  <Controls.MyInput
                    name='MaxQuestions'
                    label='MaxQuestions'
                    value={values.MaxQuestions}
                    onChange={handleInputChange}
                    error={errors.MaxQuestions}
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
