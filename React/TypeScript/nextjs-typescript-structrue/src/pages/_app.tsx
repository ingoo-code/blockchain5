import React from 'react'
import { AppProps } from 'next/app'
import {useStore} from 'react-redux'
import { ThemeProvider } from 'styled-components'
import wrapper from '../store/store'
import {PersistGate} from 'redux-persist/integration/react';

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import { SagaStore } from '../store/store'

// const MyApp = ({Component, pageProps}:AppProps) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Component {...pageProps} />
//       <GlobalStyle />
//     </ThemeProvider>
//   )
// }

// export default wrapper.withRedux(MyApp)
export default wrapper.withRedux(({Component, pageProps}:AppProps)=>{
  const store:SagaStore = useStore()
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
     </PersistGate>
  )
})
