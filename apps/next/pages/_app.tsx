import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import "mapbox-gl/dist/mapbox-gl.css"
import '../app.css'
import 'raf/polyfill'
import 'reactflow/dist/style.css'
import 'protoflow/src/styles.css'
import 'protoflow/src/diagram/menu.module.css'
import 'react-sliding-side-panel/lib/index.css'
import 'protolib/styles/datatable.css';
import '../chat.css'
import '../map.css'
import '../chonky.css'
import 'react-dropzone-uploader/dist/styles.css'
import 'react-chat-widget/lib/styles.css';
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { setConfig } from 'protolib/base/Config';
import {getBaseConfig} from 'app/BaseConfig'
setConfig(getBaseConfig("next", process))
import { Provider } from 'app/provider'
import Head from 'next/head'
import React, { createContext } from 'react'
import type { SolitoAppProps } from 'solito'
import { SiteConfig } from 'app/conf'
import { AppConfContext } from 'app/provider/AppConf'
import { Provider as JotaiProvider } from 'jotai'
import { Connector } from 'mqtt-react-hooks'
import { initSchemaSystem } from 'protolib/base'
import {useSession} from 'protolib'
initSchemaSystem()

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css')
}

function MyApp({ Component, pageProps }: SolitoAppProps) {
  //@ts-ignore
  const [session] = useSession(pageProps['pageSession'])

  const isElectron = () => {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
      return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
      return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
      return true;
    }

    return false;
  }
  const brokerUrl = typeof document !== "undefined" ? (document.location.protocol === "https:" ? "wss" : "ws") + "://" + document.location.host + '/websocket' : '';
  if (typeof document !== "undefined" && !isElectron && document.location.port == "3000") {
    //TODO: improve this hack. This is to prevent people from incorrenctly entering the 3000 port directly into next, and getting errors. 
    document.location.href = document.location.protocol + '//' + document.location.hostname + ':8080'
    return <>This is an internal port for diagnostic purposes. Redirecting to default development port...</>
  }

  return (
    <>
      <Head>
        <title>Protofy - AI Supercharged LowCode Platform CMS and Framework</title>
        <meta name="description" content="Next Generation Development Platform for web, mobile and IoT. Based on proven tech: React, ChatGPT, ESPHome, Express, Next, Node, Tamagui, Zod, LevelDB an much more." />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <JotaiProvider>
        <Connector brokerUrl={brokerUrl} options={{username: session?.user?.id, password: session?.token}}>
          <ThemeProvider>
            <AppConfContext.Provider value={SiteConfig}>
              <Component {...pageProps} />
            </AppConfContext.Provider>
          </ThemeProvider>
        </Connector>
      </JotaiProvider>
    </>
  )
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme()

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as any)
      }}
    >
      <Provider disableRootThemeClass defaultTheme={theme}>
        {children}
      </Provider>
    </NextThemeProvider>
  )
}

export default MyApp
