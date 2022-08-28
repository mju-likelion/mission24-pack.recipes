import GlobalStyle from './styles/GlobalStyles';
import NavBar from './components/NavBar';
import Header from './components/Header';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';

import LoginPage from './page/Login';
import RegisterPage from './page/Register';
import Toast from './components/Toast';
import Footer from './components/Footer';
import ListBox from './components/List';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <NavBar />
              <ListBox />
            </>
          }
        />
        <Route
          path='/login'
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path='/register'
          element={
            <>
              <RegisterPage />
            </>
          }
        />
      </Routes>
      <Toast />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
