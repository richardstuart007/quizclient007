//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Formik, Form } from 'formik'
import { Container, Grid } from '@mui/material'
import { Storage } from '@mui/icons-material'
//
//  Common Sub Components
//
import { useQForm, QForm } from '../../useQForm'
import QuizPageHeader from '../Common/QuizPageHeader'
//
//  Controls
//
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
let g_log1 = false
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialFValues = {
  z_Log: false
}
//
//  Saved Values on Submit
//
const savedValues = {
  z_Log: false
}
//===================================================================================
const QuizSettings = () => {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Set Debug State
  //
  g_log1 = snapShot.v_Log
  if (g_log1) console.log('Start QuizSettings')
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    if (g_log1) console.log('fieldValues ', fieldValues)
    let temp = { ...errors }
    if ('z_Log' in fieldValues) temp.z_Log = ''
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
    if (g_log1) console.log('validate ', validate())
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
    savedValues.z_Log = values.z_Log
    //
    //  Update Store
    //
    if (g_log1) console.log('Update Store: v_Log ', savedValues.z_Log)
    ValtioStore.v_Page = 'QuizTest'
    ValtioStore.v_Log = savedValues.z_Log
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
              title='Quiz Settings'
              subTitle='Change the settings as required'
              icon={<Storage fontSize='large' />}
            />
            <QForm>
              <Grid container spacing={2}>
                {/*.................................................................................................*/}
                <Grid item xs={6}>
                  <Controls.MyCheckbox
                    name='z_Log'
                    label='Log'
                    value={values.z_Log}
                    onChange={handleInputChange}
                    error={errors.z_Log}
                  />
                </Grid>
              </Grid>
              {/*.................................................................................................*/}
              <Grid item xs={12}>
                <Controls.MyButton
                  type='submit'
                  text='TestQuiz'
                  value='Submit'
                />
              </Grid>
            </QForm>
          </Form>
        </Formik>
      </Container>
    </Grid>
  )
}

export default QuizSettings
