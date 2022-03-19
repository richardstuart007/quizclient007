//
//  Libraries
//
import { Typography, AppBar, Toolbar, Avatar, Grid } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import { format } from 'date-fns'
//
//  Style overrides
//
const useStyles = makeStyles(theme => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3)
    },
    root: {
      display: 'flex'
    },
    title: {
      marginLeft: theme.spacing(2)
    },
    appBar: {
      width: '100%'
    },
    date: {
      marginLeft: theme.spacing(10)
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})
//===================================================================================
export default function Layout({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* app bar */}

      <AppBar
        position='fixed'
        className={classes.appBar}
        elevation={0}
        color='primary'
      >
        <Toolbar>
          <Grid container alignItems='center'>
            <Grid item>
              <Avatar className={classes.avatar} src='./cards.svg' />
            </Grid>
            <Grid item>
              <Typography className={classes.title}> BRIDGE QUIZ</Typography>
            </Grid>
            <Grid item xs></Grid>
            <Grid item>
              <Typography className={classes.date}>
                Today is the {format(new Date(), 'do MMMM Y')}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}
