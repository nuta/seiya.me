import '../styles/globals.scss'
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }) {
    return <>
        <Component {...pageProps} />
        <Analytics />
    </>
}

export default App
