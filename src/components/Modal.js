import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as OutButton } from '../images/outButton.svg';
const Modal = ({ modalClose }) => {
  const [listNumber, setListNumber] = useState([0]);
  const Adding = () => {
    alert('눌림');
    setListNumber((prev) => [...prev, 0]);
  };

  return (
    //모달이 열릴 때 openModal 클래스 생성
    <ModalWrapper>
      <CloseButton onClick={modalClose} />
      <Title>작성하기</Title>
      <ListWrapper>
        {listNumber.map((_, index) => (
          <div key={index}>
            <ListText />
            <ListLine />
          </div>
        ))}
      </ListWrapper>

      <PlusButton onClick={Adding}>+</PlusButton>
      <AddButton>추가하기</AddButton>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: absolute;
  left: 447px;
  top: 309px;

  width: 560px;
  height: auto;
  background: #d6e8e3;
  opacity: 0.9;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled(OutButton)`
  display: flex;
  margin-left: 480px;
  margin-top: 14px;
`;

const Title = styled.p`
  font-weight: 400;
  font-size: 40px;
  line-height: 70px;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const PlusButton = styled.div`
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 40px;
  margin: 28px;
`;

const ListWrapper = styled.div`
  width: 328px;
  height: 150px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #bedbb8;
    height: 1%; /* 스크롤바의 길이 */
  }
  &::-webkit-scrollbar-track {
    background: #ffffff; /* 스크롤바 뒷 배경 색상 */
  }
`;

const ListText = styled.input`
  display: flex;
  justify-content: left;
  margin-left: 20px;
  background: none;
  border: none;
  :focus {
    outline: none;
  }
`;

const ListLine = styled.hr`
  display: flex;
  align-items: center;
  width: 300px;
`;

const AddButton = styled.button`
  width: 120px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  border-radius: 10px;
  background: #ffffff;
  margin-bottom: 23px;
  border: 0;
  :active {
  }
`;
export default Modal;
