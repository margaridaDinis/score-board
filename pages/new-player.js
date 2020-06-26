import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router';
import {
  Alert,
  Panel,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar,
  Button,
} from 'rsuite';
import api from '../utils/api';

function NewPlayer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCreatePlayer = async () => {
    const data = { data: { attributes: { name, email } } };

    setErrors({});
    setLoading(true);

    try {
      await api.post('/players', data);
      Router.push('/');
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
        <title>New Player</title>
      </Head>

      <main>
        <Panel>
          <h1>New Player</h1>
          <Form onSubmit={handleCreatePlayer}>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                name='name'
                value={name}
                onChange={setName}
                errorMessage={errors.name}
                errorPlacement='bottomStart'
                disabled={loading}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                name='email'
                type='email'
                value={email}
                onChange={setEmail}
                errorMessage={errors.email}
                errorPlacement='bottomStart'
                disabled={loading}
              />
            </FormGroup>
            <ButtonToolbar>
              <Button appearance='primary' type='submit' loading={loading}>
                Create player
              </Button>
              <Link href='/'>
                <Button appearance='default'>Cancel</Button>
              </Link>
            </ButtonToolbar>
          </Form>
        </Panel>
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

export default NewPlayer;
