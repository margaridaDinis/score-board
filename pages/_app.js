import 'rsuite/lib/styles/index.less';

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  return (
    <>
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
        `}
      </style>
    </>
  );
}

export default App;
