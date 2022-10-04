import Head from "next/head";
import '../styles/globals.css'
import '../styles/lib/colors.css'

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <style>
            @import url(https://fonts.googleapis.com/css2?family=Inter&display=swap);
            @import url(https://fonts.googleapis.com/css2?family=Homenaje&display=swap);
              @import url(https://cdn.rawgit.com/harvesthq/chosen/gh-pages/chosen.min.css);
          </style>
        </Head>
        <Component {...pageProps} />
      </>
  )
}

export default MyApp
