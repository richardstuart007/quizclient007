//
//  Libraries
//
import { useState } from 'react'
import makeStyles from '@mui/styles/makeStyles';
//===================================================================================
export function useQForm(initialFValues, validateOnChange = false, validate) {
  //
  //  Field Values & Error Text
  //
  const [values, setValues] = useState(initialFValues)
  const [errors, setErrors] = useState({})
  //
  //  Update the State with the value passed in the target
  //
  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    //
    //  Validate individual field on change
    //
    if (validateOnChange) validate({ [name]: value })
  }
  //
  //   return the State & function
  //
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  }
}
//.............................................................................
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  }
}))

//===================================================================================
export function QForm(props) {
  const classes = useStyles()
  const { children, ...other } = props
  return (
    <div className={classes.root} autoComplete='off' {...other}>
      {props.children}
    </div>
  )
}
