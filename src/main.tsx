import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import './index.css'

const theme = createTheme({
  palette: {
      background: {
          default: '#f3f3f3',
      },
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline>
                    <App />
                </CssBaseline>
            </Provider>
        </ThemeProvider>
    // </React.StrictMode>
)
