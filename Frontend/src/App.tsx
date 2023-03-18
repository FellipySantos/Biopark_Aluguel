import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/deafult'
import { Apartamentos } from './pages/apartamentos/apartamentos'
import { ApartamentoProvider } from './context/apartamentoContext'
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ApartamentoProvider>
         <Apartamentos />
      </ApartamentoProvider>
      
    </ThemeProvider>
  )
}
