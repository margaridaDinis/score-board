import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import { FlexboxGrid } from 'rsuite';
import GameHistory from '../components/organisms/GameHistory';
import api from '../utils/api';

function Home({ games }) {
  return (
    <div>
      <Head>
        <title>Score board</title>
      </Head>

      <main>
        <div className='main-wrapper'>
          <FlexboxGrid justify='center'>
            <FlexboxGrid.Item>
              <Link href='/new-game'>
                <a className='new-game-button'>New game</a>
              </Link>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
        <GameHistory games={games} />
      </main>

      <style jsx>
        {`
          .main-wrapper {
            padding: 5rem 0;
          }

          .new-game-button {
            text-decoration: none;
            font-size: 4rem;
            background-color: #3498ff;
            color: white;
            padding: 1rem;
          }
        `}
      </style>
    </div>
  );
}

export async function getStaticProps() {
  const res = await api.get('/games');

  return { props: { games: res.data } };
}

Home.propTypes = {
  games: PropTypes.array,
};

export default Home;
