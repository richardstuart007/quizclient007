//
// Libraries
//
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider
} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
//
//  Pages
//
import QuizControl from '../pages/Quiz/QuizControl'
//
//  Common Components
//
import Layout from '../components/Layout/Layout'
//
//  Layout Theme
//
const theme = createTheme({})
//
//  Render the components
//
function App() {
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Layout>
            <QuizControl />
          </Layout>
          <CssBaseline />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  )
}

export default App
