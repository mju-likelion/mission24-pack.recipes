import GlobalStyle from './styles/GlobalStyles';
import List from './components/List';
import NavBar from './components/NavBar';
import Header from './components/Header';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Header />
      <NavBar />
      <List />
    </ThemeProvider>
  );
}

export default App;
