import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Like } from '../images/like.svg';
import Modal from './Modal';

const List = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    //axios예정
  }, []);

  return (
    <ListWrapper>
      <Header>
        TITLE
        <SortDiv>
          <button onClick={() => {}}>최신순</button> |
          <button onClick={() => {}}>인기순</button>
        </SortDiv>
      </Header>
      <ListBox>
        <ListBoxWrapper>
          <ListItemBox>
            <ListItem>dsds</ListItem>
          </ListItemBox>
          <LikeBox>
            <Like />
            <LikeNum></LikeNum>
          </LikeBox>
        </ListBoxWrapper>
        <Button onClick={modalClose}>추가하기</Button>
        {modalOpen && <Modal modalClose={modalClose}></Modal>}
      </ListBox>
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  margin: 0 auto;
  width: 560px;
  min-height: 774px;
`;

const Header = styled.div`
  display: flex;
  margin-left: 24px;
  height: 74px;
  font-size: 44px;
  justify-content: space-between;
`;

const SortDiv = styled.span`
  height: 30px;
  font-size: 20px;
  margin: 34px 12px 0 0;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const ListBox = styled.div`
  height: 630px;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.colors.yellow};
  padding: 70px 0 0 0;
`;

const ListBoxWrapper = styled.div`
  margin: 0 auto;
  height: 506px;
  width: 392px;

  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.primary}; /* 스크롤바의 색상 */
    height: 2%; /* 스크롤바의 길이 */
  }
  &::-webkit-scrollbar-track {
    background: #fff; /* 스크롤바 뒷 배경 색상 */
  }
`;

const ListItemBox = styled.div`
  width: 344px;
  font-size: 24px;
`;

const ListItem = styled.div`
  width: 328px;
  border-bottom: solid 2px #ffe5a4;
  font-size: 24px;
  margin: 34px 0 0 0;
`;

const LikeBox = styled.div`
  width: 16px;
  height: 30px;
  margin: -30px 0 0 370px;
`;

const LikeNum = styled.div`
  font-size: 10px;
`;

const Button = styled.button`
  position: absolute;
  top: 700px;
  left: 880px;
  background: #a2c79a;
  border-radius: 10px;
  border: none;
  padding: 10px;
  color: white;
  cursor: pointer;
  margin-bottom: 23px;
`;

export default List;
