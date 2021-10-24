import ngeohash from 'ngeohash';
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import Textfield from './components/Textfield';
import Button from './components/Button';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const INITIAL_FORM_STATE = {
  longitude: '',
  latitude: '',
};

const FORM_VALIDATION = Yup.object().shape({
  longitude: Yup.string()
    .required('Required')
    .matches(
      /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$.*$/,
      'Longitudes range from -180 to 180 with max 6 decimal digits'
    ),
  latitude: Yup.string()
    .required('Required')
    .matches(
      /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$.*$/,
      'Latitudes range from -90 to 90 with max 6 decimal digits'
    ),
});

const App = () => {
  const classes = useStyles();
  const [geohash, setGeohash] = React.useState('');
  const [neighbors, setNeighbors] = React.useState([]);

  return (
    <Grid container>
      <Grid item xs={8}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const geohash = ngeohash.encode(
                  values.latitude,
                  values.longitude
                );
                setGeohash(geohash);
                setNeighbors(ngeohash.neighbors(geohash));
              }}
            >
              {({ values }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography>Longitude: {values.longitude}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Longitude: {values.latitude}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Textfield name="longitude" label="Longitude" />
                    </Grid>
                    <Grid item xs={6}>
                      <Textfield name="latitude" label="Latitude" />
                    </Grid>
                    <Grid item xs={4}>
                      <Button>Submit Form</Button>
                    </Grid>
                  </Grid>
                  {geohash && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>Geohash: {geohash}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography color="primary">Neighbors:</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>north: {neighbors[0]}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>north-east: {neighbors[1]}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>east: {neighbors[2]}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>south-east: {neighbors[3]}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>south: {neighbors[4]}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>south-west: {neighbors[5]}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>west: {neighbors[6]}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>north-west: {neighbors[7]}</Typography>
                      </Grid>
                    </Grid>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default App;
