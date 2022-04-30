import '../styles/globals.css'
import GlobalProvider from './contextapi/GlobalContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
      <ToastContainer />
    </>
  )

}

export default MyApp
