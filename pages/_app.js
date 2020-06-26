import 'rsuite/lib/styles/index.less';
import Head from 'next/head';
import NavigationHeader from '../components/molecules/Navbar';
import { FlexboxGrid, Col } from 'rsuite';

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Score Board</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>

      <NavigationHeader />

      <FlexboxGrid justify='center'>
        <FlexboxGrid.Item componentClass={Col} xs={24} md={8}>
          <Component {...pageProps} />
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <style jsx>
        {`
          .navbar-brand {
            padding: 18px 20px;
            display: inline-block;
          }
        `}
      </style>
      <style jsx global>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
            font-size: 16px;
          }

          * {
            box-sizing: border-box;
          }

          main {
            padding: 1rem;
          }

          .align-center {
            text-align: center;
          }

          .text-uppercase {
            text-transform: uppercase;
          }
        `}
      </style>
    </>
  );
}

export default App;
