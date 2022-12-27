import { useState, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as OutButton } from '../images/outButton.svg';
import Axios from '../lib/axios';
import { useRecoilValue } from 'recoil';
import { TitleAtom } from '../atoms/TitleAtom';
import useToast from '../hooks/useToast';

const Modal = ({ modalClose }) => {
  const [listNumber, setListNumber] = useState([0]);
  const [itemName, setItemName] = useState(['']);

  const { id } = useRecoilValue(TitleAtom);
  const outside = useRef();
  const inside = useRef();
  const ListAdding = () => {
    setListNumber((prev) => [...prev, 0]);
    setItemName((prev) => [...prev, '']);
  };

  const TextHandle = (index, text) => {
    setItemName((prev) => {
      const arr = [...prev];
      arr[index] = text;

      return arr;
    });
  };

  const [, addToast] = useToast();

  const ItemAdding = async () => {
    if (!localStorage.getItem('access-token')) {
      addToast('로그인 후 이용해주세요!', 2000);
    } else {
      const token = localStorage.getItem('access-token');
      for (const item of itemName) {
        await Axios.post(
          '/items',
          {
            categoryId: id,
            name: item,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        modalClose();
      }
    }
  };

  return (
    //모달이 열릴 때 openModal 클래스 생성
    <>
      <ModalBg ref={outside} onClick={modalClose} />
      <ModalWrapper ref={inside}>
        <CloseButton onClick={modalClose} />
        <Title>작성하기</Title>
        <ListWrapper>
          {listNumber.map((_, index) => (
            <div key={index}>
              <ListText
                onChange={(e) => TextHandle(index, e.target.value)}
                value={itemName[index]}
              />
              <ListLine />
            </div>
          ))}
        </ListWrapper>

        <PlusButton onClick={ListAdding}>+</PlusButton>
        <AddButton onClick={ItemAdding}>추가하기</AddButton>
      </ModalWrapper>
    </>
  );
};

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.2);
`;
const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 560px;
  height: auto;
  background: #d6e8e3;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 599px) {
    width: 80%;
    height: 45%;
  }
`;

const CloseButton = styled(OutButton)`
  display: flex;
  margin-left: 480px;
  margin-top: 30px;

  @media screen and (max-width: 599px) {
    margin-right: 30%;
    margin-top: 5%;
  }
`;

const Title = styled.p`
  font-weight: 400;
  font-size: 40px;
  line-height: 70px;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;

  @media screen and (max-width: 599px) {
    margin-top: 10px;
  }
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

  @media screen and (max-width: 599px) {
    margin-top: 5%;
  }
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
  font-size: 25px;
  color: #424242;
  :focus {
    outline: none;
  }

  @media screen and (max-width: 599px) {
    padding: 2%;
    font-size: 20px;
  }
`;

const ListLine = styled.hr`
  display: flex;
  align-items: center;
  width: auto;
  border: solid 1px #77977b;
  background-color: #77977b;
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
  @media screen and (max-width: 599px) {
    padding: 2%;
  }
`;
export default Modal;
