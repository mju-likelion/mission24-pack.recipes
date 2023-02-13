import GlobalStyle from './styles/GlobalStyles';
import NavBar from './components/NavBar';
import Header from './components/Header';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';

import LoginPage from './page/Login';
import RegisterPage from './page/Register';
// import Toast from './components/Toast';
import Footer from './components/Footer';
import ListBox from './components/List';
import Error from './components/Error';

import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Axios from './lib/axios';

import styled from 'styled-components';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteChangeTracker from './RouteChangeTracker';

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await Axios.get(queryKey[0]);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

function App() {
  RouteChangeTracker();

  return (
    <QueryClientProvider client={queryClient}>
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
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/*' element={<Error errorMsg='Error 404' />} />
        </Routes>
        {/* <Toast /> 
        recoil로 만든 토스트메시지인데, 아직 삭제를 할지 말지 몰라서 우선 놔뒀습니다.
        */}
        <StyledToastContainer
          position='bottom-center'
          autoClose={4000}
          hideProgressBar
          transition={Slide}
          closeButton={false}
          limit={1}
        />
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
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
