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

import styled from 'styled-components';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <StyledToastContainer
        position='bottom-center'
        autoClose={2000}
        hideProgressBar
        transition={Slide}
        closeButton={false}
        limit={1}
      />
      <Footer />
    </ThemeProvider>
  );
}

const StyledToastContainer = styled(ToastContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .Toastify__toast {
    box-shadow: none;
    background-color: ${({ theme }) => theme.colors.green};
    border-radius: 20px;
    height: 100px;
    width: 392px;
    line-height: 30px;
  }
`;

export default App;
