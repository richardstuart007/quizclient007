//
//  Debug logging
//
const g_log1 = false
//===================================================================================
function QuizRandomSort(dataIn) {
  //
  //  Load the workArray
  //
  let workArray = []
  dataIn.forEach(data => {
    const ansObj = {
      random: Math.random(),
      details: data
    }
    workArray.push(ansObj)
  })
  //
  //  Sort the workArray
  //
  workArray.sort((a, b) => (a.random > b.random ? 1 : -1))
  if (g_log1) console.log(workArray)
  //
  //  Strip out the random element
  //
  const dataSorted = workArray.map(data => {
    return data.details
  })
  //
  //  Return sorted array
  //
  if (g_log1) console.log('dataSorted  ', dataSorted)
  return dataSorted
}

export default QuizRandomSort
