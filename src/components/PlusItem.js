import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as OutButton } from '../images/outButton.svg';
import { useRecoilValue } from 'recoil';
import { TitleAtom } from '../atoms/TitleAtom';
import usePlus from '../hooks/usePlus';
import { toast } from 'react-toastify';
import useList from '../hooks/useList';
import Modal from './Modal';

const ItemPlus = ({ modalClose, sort }) => {
  // 리스트 정보
  const [listNumber, setListNumber] = useState([0]);
  const [itemName, setItemName] = useState(['']);

  // 해당 카테고리 id
  const { id } = useRecoilValue(TitleAtom);

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

  const { listFetch } = useList(sort, id);

  const listUpdate = usePlus(sort, id, itemName);

  //추가하기 기능
  const itemplus = async () => {
    for (const item of itemName) {
      if (item.trim() === '') {
        toast('빈 값은 입력할 수 없습니다.');
        return;
      }
    }

    await listUpdate.mutateAsync();
    modalClose();
    listFetch();
    toast('아이템을 추가했습니다.');
  };

  return (
    <>
      <Modal>
        <TopBox>
          <CloseButton onClick={modalClose} />
          <Title>작성하기</Title>
        </TopBox>
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
      </Modal>
    </>
  );
};

const TopBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled(OutButton)`
  margin-left: 480px;
  margin-top: 30px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 30px;
    height: 30px;

    margin-top: 15px;
    margin-left: 90%;
  }
`;

const Title = styled.p`
  display: flex;

  font-weight: 400;
  font-size: 40px;
  line-height: 70px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 34px;
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
    width: 28px;
    height: 28px;

    margin: 14px 0 2px 0;
    font-size: 26px;
    line-height: 34px;
  }
`;

const ListWrapper = styled.div`
  width: 330px;
  height: 180px;
  overflow: auto;
  margin-bottom: 10px;

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

  @media screen and (max-width: 375px) {
    width: 80%;
    height: 55%;
  }

  @media screen and (max-width: 599px) and (min-width: 376px) {
    width: 80%;
    height: 36%;
  }
`;

const ListText = styled.input`
  display: flex;
  justify-content: left;
  margin-left: 8%;
  background: none;
  border: none;
  font-size: 25px;
  color: #424242;

  :focus {
    outline: none;
  }

  @media screen and (max-width: 599px) and (min-width: 375px) {
    padding: 1%;
    font-size: 20px;
  }
`;

const ListLine = styled.hr`
  width: 85%;
  height: 1px;
  display: flex;
  align-items: center;
  margin-bottom: 5%;

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
  color: #424242;
  margin-bottom: 23px;
  border: 0;

  :hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 100px;
    height: 40px;
    font-size: 15px;
    margin: 10px 0;
  }
`;

export default ItemPlus;
