import PropTypes from 'prop-types';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import {
  Panel,
  Form,
  FormGroup,
  FormControl,
  SelectPicker,
  ControlLabel,
  ButtonToolbar,
  Button,
  FlexboxGrid,
  Alert,
} from 'rsuite';
import api from '../utils/api';

const INITIAL_VALUE = { numberOfMatches: 3, numberOfTries: 10 };

function NewGame({ players }) {
  const [values, setValues] = useState(INITIAL_VALUE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleNewGame = async () => {
    const data = { data: { attributes: values } };
    setErrors({});
    setLoading(true);

    try {
      const game = await api.post('/games', data);

      Router.push(`/match/${game.data.id}/1`);
    } catch (error) {
      const { data } = error.response;

      if (data.errors) {
        data.errors.map((error) =>
          setErrors((prevErrors) => ({
            ...prevErrors,
            [error.id]: error.title,
          }))
        );
      }

      Alert.error('Oh no! Something went wrong!');

      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>New Game</title>
      </Head>
      <main>
        <FlexboxGrid justify='center'>
          <FlexboxGrid.Item>
            <Panel>
              <h1>New Game</h1>
              <Form onSubmit={handleNewGame}>
                <FormGroup>
                  <ControlLabel>Choose player 1</ControlLabel>
                  <FormControl
                    name='player1Id'
                    accepter={SelectPicker}
                    data={players}
                    value={values.player1Id}
                    onChange={(value) =>
                      setValues({ ...values, player1Id: value })
                    }
                    labelKey='name'
                    valueKey='id'
                    errorMessage={errors.player1Id}
                    errorPlacement='bottomStart'
                    disabled={loading}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Choose player 2</ControlLabel>
                  <FormControl
                    name='player2Id'
                    accepter={SelectPicker}
                    data={players}
                    value={values.player2Id}
                    onChange={(value) =>
                      setValues({ ...values, player2Id: value })
                    }
                    labelKey='name'
                    valueKey='id'
                    errorMessage={errors.player2Id}
                    errorPlacement='bottomStart'
                    disabled={loading}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Best of</ControlLabel>
                  <FormControl
                    name='numberOfMatches'
                    type='number'
                    value={values.numberOfMatches}
                    onChange={(value) =>
                      setValues({ ...values, numberOfMatches: value })
                    }
                    min={1}
                    errorMessage={errors.numberOfMatches}
                    errorPlacement='bottomStart'
                    disabled={loading}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Number of free throws</ControlLabel>
                  <FormControl
                    name='numberOfTries'
                    type='number'
                    value={values.numberOfTries}
                    onChange={(value) =>
                      setValues({ ...values, numberOfTries: value })
                    }
                    min={1}
                    errorMessage={errors.numberOfTries}
                    errorPlacement='bottomStart'
                    disabled={loading}
                  />
                </FormGroup>
                <ButtonToolbar>
                  <Button appearance='primary' type='submit' loading={loading}>
                    Start!
                  </Button>
                  <Link href='/'>
                    <Button appearance='default'>Cancel</Button>
                  </Link>
                </ButtonToolbar>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </main>

      <style jsx>
        {`
          h1 {
            padding-bottom: 1rem;
          }
        `}
      </style>
    </div>
  );
}

export async function getStaticProps() {
  const res = await api.get('/players');

  return { props: { players: res.data } };
}

NewGame.propTypes = {
  players: PropTypes.array,
};

export default NewGame;
