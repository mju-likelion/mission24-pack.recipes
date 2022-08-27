import GlobalStyle from './styles/GlobalStyles';

import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';
import Toast from './component/Toast';
import RegisterPage from './page/Register';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/Login';

import NavBar from './components/NavBar';

import Header from './components/Header';
import 'normalize.css';
import Footer from './component/footer';

// import Modal from './components/Modal';
// import { useState } from 'react';

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
