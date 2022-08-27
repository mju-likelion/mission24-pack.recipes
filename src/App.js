import GlobalStyle from './styles/GlobalStyles';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';
import Footer from './component/footer';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
