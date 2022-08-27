import GlobalStyle from './styles/GlobalStyles';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';
import Toast from './component/Toast';
import RegisterPage from './page/Register';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/Login';
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Routes>
        <Route path='/' />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <Toast />
    </ThemeProvider>
  );
}

export default App;
