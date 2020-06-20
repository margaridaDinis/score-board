import Head from 'next/head';
import Link from 'next/link';
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
} from 'rsuite';

function NewGame() {
  return (
    <div>
      <Head>
        <title>New Game</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <FlexboxGrid justify='center'>
          <FlexboxGrid.Item>
            <Panel>
              <h1>New Game</h1>
              <Form>
                <FormGroup>
                  <ControlLabel>Choose player 1</ControlLabel>
                  <SelectPicker block name='player1' data={[]} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Choose player 2</ControlLabel>
                  <SelectPicker block name='player2' data={[]} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Best of</ControlLabel>
                  <FormControl
                    name='numberOfMatches'
                    type='number'
                    value={3}
                    min={0}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Number of free throws</ControlLabel>
                  <FormControl
                    name='numberOfTries'
                    type='number'
                    value={10}
                    min={0}
                  />
                </FormGroup>
                <ButtonToolbar>
                  <Link href='/match/1/1'>
                    <Button appearance='primary'>Start!</Button>
                  </Link>
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

export default NewGame;
