import '../styles/globals.css'
import GlobalProvider from './contextapi/GlobalContext'
function MyApp({ Component, pageProps }) {
  return (<GlobalProvider>
    <Component {...pageProps} />
  </GlobalProvider>)

}

export default MyApp
