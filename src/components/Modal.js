import { useState, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as OutButton } from '../images/outButton.svg';
import { useRecoilValue } from 'recoil';
import { TitleAtom } from '../atoms/TitleAtom';
import usePlus from '../hooks/usePlus';
import { useQueryClient } from '@tanstack/react-query';

const Modal = ({ modalClose, sort }) => {
  // 리스트 정보
  const [listNumber, setListNumber] = useState([0]);
  const [itemName, setItemName] = useState(['']);

  // 해당 카테고리 id
  const { id } = useRecoilValue(TitleAtom);

  // 모달 백그라운드 구분
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

  const listUpdate = usePlus(id, sort, itemName);
  const queryClient = useQueryClient();

  //추가하기 기능
  const itemplus = async (itemId, sort) => {
    await listUpdate.mutateAsync(itemId);
    modalClose();
    queryClient.invalidateQueries([
      `/items?categoryId=${id}&skip=0&limit=100&orderBy=${sort}:dsc`,
    ]);
  };

  return (
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
        <AddButton onClick={itemplus}>추가하기</AddButton>
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
  z-index: 100;

  background: #d6e8e3;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 80%;
    height: 45%;
  }
`;

const CloseButton = styled(OutButton)`
  display: flex;
  margin-left: 480px;
  margin-top: 30px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    margin-right: 30%;
    margin-top: 5%;
  }
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;

  font-weight: 400;
  font-size: 40px;
  line-height: 70px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    margin-top: 10px;
  }
`;

const PlusButton = styled.div`
  width: 40px;
  height: 40px;

  background-color: #ffffff;

  border-radius: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 40px;
  margin: 28px;

  :hover {
    background: #ffffff;
    color: #a2c79a;
  }

  @media screen and (max-width: 599px) and (min-width: 375px) {
    margin-top: 5%;
  }
`;

const ListWrapper = styled.div`
  width: 330px;
  height: 180px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #77977b;
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

  :focus {
    outline: none;
  }

  @media screen and (max-width: 599px) and (min-width: 375px) {
    padding: 2%;
    font-size: 20px;
  }
`;

const ListLine = styled.hr`
  display: flex;
  align-items: center;
  width: auto;
  margin-bottom: 5%;
  height: 1px;
  border: solid 1px #9bb89e;
  background-color: #9bb89e;
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

  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }

  @media screen and (max-width: 599px) and (min-width: 375px) {
    padding: 2%;
  }
`;

export default Modal;
