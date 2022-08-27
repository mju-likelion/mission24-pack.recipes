import GlobalStyle from './styles/GlobalStyles';
import Header from './components/Header';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';
import List from './components/List';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Header />
      <List />
    </ThemeProvider>
  );
}

export default App;
