import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyles from './styles/global'

import { ThemeProvider } from 'styled-components'
import theme from "./styles/theme"

import {AuthProvaider} from './hooks/auth'

import { Routes } from './routes'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <AuthProvaider>
        <Routes />
      </AuthProvaider>
    </ThemeProvider>
  </StrictMode>,
)
