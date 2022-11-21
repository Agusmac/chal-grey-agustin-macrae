import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
  <div className='gradient min-h-screen text-slate-50'>
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp


// made by Agustin Mac Rae