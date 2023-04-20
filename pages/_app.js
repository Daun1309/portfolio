import '@/styles/common.scss'
import Layout from '../component/Layout'
import Context from '../component/Context'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Context>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Context>
    </>
  )
}
