import GlobalStyle from './styles/GlobalStyles';

import NavBar from './components/NavBar';

import Header from './components/Header';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';
import Modal from './components/Modal';
import { useState } from 'react';
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <Header />
      <NavBar />

      <button onClick={modalClose}>모달 테스트</button>
      {modalOpen && <Modal modalClose={modalClose}></Modal>}
    </ThemeProvider>
  );
}

export default App;
