import ngeohash from 'ngeohash';
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Container, Box, Paper } from '@mui/material';
import Textfield from './components/Textfield';
import Button from './components/Button';

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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '0px',
  color: theme.palette.text.secondary,
}));

const App = () => {
  const [geohash, setGeohash] = React.useState('');
  const [neighbors, setNeighbors] = React.useState([]);

  return (
    <Container maxWidth="md">
      <Box mt={2}>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            const geohash = ngeohash.encode(values.latitude, values.longitude);
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
                <Grid
                  container
                  sx={{ backgroundColor: 'warning.light', marginTop: '20px' }}
                >
                  <Grid item xs={4}>
                    <Item sx={{ marginBottom: '5px', marginRight: '5px' }}>
                      <Typography>North-West: {neighbors[7]}</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item sx={{ marginBottom: '5px', marginRight: '5px' }}>
                      <Typography>North: {neighbors[0]}</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>
                      <Typography>North-East: {neighbors[1]}</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item sx={{ marginBottom: '5px', marginRight: '5px' }}>
                      <Typography>West: {neighbors[6]}</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item sx={{ marginBottom: '5px', marginRight: '5px' }}>
                      <Typography>Geohash: {geohash}</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>
                      <Typography>East: {neighbors[2]}</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item sx={{ marginRight: '5px' }}>
                      <Typography>South-West: {neighbors[5]}</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item sx={{ marginRight: '5px' }}>
                      <Typography>South: {neighbors[4]}</Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>
                      <Typography>South-East: {neighbors[3]}</Typography>
                    </Item>
                  </Grid>
                </Grid>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default App;
