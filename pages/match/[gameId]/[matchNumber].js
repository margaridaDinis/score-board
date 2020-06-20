import Head from 'next/head';
import { useRouter } from 'next/router';

function MatchNumber() {
  const router = useRouter();
  const { matchNumber } = router.query;

  return (
    <div>
      <Head>
        <title>Match {matchNumber}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Match {matchNumber}</h1>
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

export default MatchNumber;
