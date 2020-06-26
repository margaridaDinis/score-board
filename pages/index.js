import Head from 'next/head';
import Link from 'next/link';
import { FlexboxGrid, Button } from 'rsuite';

export default function Home() {
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
      </main>

      <style jsx>
        {`
          .main-wrapper {
            padding-top: 5rem;
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
