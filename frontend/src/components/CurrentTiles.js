import "../css/CurrentTiles";
import { useEffect } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
}));

function CurrentTiles() {
    const classes = useStyles();
  
    return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((value) => (
            <Grid key={value} item>
            {/* refer to index of list to fetch image*/}
              <img src="assets/default.png" alt="" />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.control}>
        </Paper>
      </Grid>
    </Grid>
    );
  }
  
  
  export default CurrentTiles;
  