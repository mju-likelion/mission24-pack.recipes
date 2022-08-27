import GlobalStyle from './styles/GlobalStyles';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/theme';
import Modal from './components/Modal';
import { useState } from 'react';
import List from './components/List';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <List />
      <button onClick={modalClose}>모달 테스트</button>
      {modalOpen && <Modal modalClose={modalClose}></Modal>}
    </ThemeProvider>
  );
}

export default App;
