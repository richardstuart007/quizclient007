//
//  Utilities
//
import { ValtioStore } from '../../ValtioStore'
import apiAxios from '../../../../services/apiAxios'
import QuizRandomSort from '../../../../services/QuizRandomSort'
//
// Constants
//
const sqlClient = 'Quiz/QuizGetData'
const { URL_BASE } = require('../../../../services/constants.js')
const { URL_QUESTIONS } = require('../../../../services/constants.js')
const { SQL_TABLE } = require('../../../../services/constants.js')
//
//  Debug logging
//
let g_log1 = false
//===================================================================================
async function QuizSelectGetData({ qowner, qgroup1, qgroup2, MaxQuestions }) {
  if (g_log1) console.log('Start QuizSelectGetData')
  //--------------------------------------------------------------------
  //.  fetch data
  //--------------------------------------------------------------------
  const fetchItems = async () => {
    try {
      //
      //  sqlString
      //
      let sqlString = `* from ${SQL_TABLE} where qowner = '${qowner}' and qgroup1 = '${qgroup1}' `
      if (qgroup2) sqlString = sqlString.concat(` and qgroup2 = '${qgroup2}'`)
      sqlString = sqlString.concat(` FETCH NEXT ${MaxQuestions} ROWS ONLY`)
      if (g_log1) console.log('sqlString ', sqlString)
      //
      //  Setup actions
      //
      const method = 'post'
      const body = {
        sqlClient: sqlClient,
        sqlAction: 'SELECTSQL',
        sqlString: sqlString
      }
      const URL = URL_BASE + URL_QUESTIONS
      if (g_log1) console.log('URL ', URL)
      //
      //  SQL database
      //
      const resultData = await apiAxios(method, URL, body)
      if (g_log1) console.log('data returned ', resultData)
      //
      // No data
      //
      if (!resultData[0]) {
        throw Error('No data received')
      }
      //
      // update ValtioStore - Data
      //
      if (g_log1) console.log('update v_Data', resultData)
      ValtioStore.v_Data = resultData
      //
      // update ValtioStore - Questions
      //
      const sortedData = QuizRandomSort(resultData)
      if (g_log1) console.log('update v_Quest', sortedData)
      ValtioStore.v_Quest = sortedData
      //
      // Return data
      //
      if (g_log1) console.log('return data 1', sortedData)
      return sortedData
      //
      // Errors
      //
    } catch (err) {
      console.log(err.message)
    }
  }
  //--------------------------------------------------------------------
  //-  Initial fetch of data
  //--------------------------------------------------------------------
  //
  // Clear the store
  //
  if (g_log1) console.log('clear v_Data')
  ValtioStore.v_Data = []
  if (g_log1) console.log('clear v_Quest')
  ValtioStore.v_Quest = []
  //
  // Load the store
  //
  const resultData = fetchItems()
  //
  // Return promise
  //
  if (g_log1) console.log('return data 3', resultData)
  return resultData
}

export default QuizSelectGetData
