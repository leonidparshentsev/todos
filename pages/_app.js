import MainWrapper from '../components/MainWrapper/MainWrapper';
import '../styles/global.css'
import Head from 'next/head';

export default function App() {

  return (
    <>
      <Head>
        <title>Todos</title>
        <link
          rel="icon"
          href="/icon.png"
          type="image/png"
          sizes="32x32"
        />
      </Head>
      <MainWrapper />
    </>
  )

}