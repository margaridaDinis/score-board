import 'rsuite/lib/styles/index.less';
import Head from 'next/head';

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Score Board</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
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

          .alignCenter {
            text-align: center;
          }
        `}
      </style>
    </>
  );
}

export default App;
