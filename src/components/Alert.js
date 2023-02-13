import { useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as OutButton } from '../images/outButton.svg';

const Alert = ({
  title,
  dialog,
  modalCloseDelegate,
  onYesHandler,
  onNoHandler,
}) => {
  // 리스트 정보

  // 모달 백그라운드 구분
  const outside = useRef();
  const inside = useRef();

  const modalClickYes = () => {
    if (onYesHandler) {
      onYesHandler();
    }

    modalCloseDelegate();
  };

  const modalClickNo = () => {
    if (onNoHandler) {
      onNoHandler();
    }

    modalCloseDelegate();
  };

  return (
    <>
      <ModalBg ref={outside} onClick={modalCloseDelegate} />
      <ModalWrapper ref={inside}>
        <CloseButton onClick={modalCloseDelegate} />
        <Title>{title}</Title>
        <Description>{dialog}</Description>
        <ButtonWrapper>
          <NoBtn onClick={() => modalClickNo()}>취소</NoBtn>
          <YesBtn onClick={() => modalClickYes()}>확인</YesBtn>
        </ButtonWrapper>
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

  /* 아이폰 SE UI */
  @media screen and (max-width: 375px) {
    width: 90%;
    height: 38%;
  }

  @media screen and (max-width: 599px) and (min-width: 376px) {
    width: 90%;
    height: 30%;
  }
`;

const CloseButton = styled(OutButton)`
  display: flex;
  margin-left: 480px;
  margin-top: 30px;

  /* 아이폰 SE UI  */
  @media screen and (max-width: 375px) {
    width: 8%;
    margin-top: 6%;
    margin-left: 80%;
  }

  @media screen and (max-width: 599px) and (min-width: 376px) {
    margin-left: 78%;
    margin-top: 0;
  }
`;

const Title = styled.div`
  font-size: 40px;
  margin-bottom: 8%;

  /* 아이폰 SE UI  */
  @media screen and (max-width: 375px) {
    font-size: 30px;
    margin-bottom: 6%;
    margin-top: 0;
  }

  @media screen and (max-width: 599px) and (min-width: 376px) {
    font-size: 30px;
    margin-bottom: 6%;
    margin-top: 4%;
  }
`;

const Description = styled.div`
  font-size: 24px;
  margin-bottom: 37px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    font-size: 16px;
    margin-top: 2%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 383px;
  margin-bottom: 63px;

  flex-direction: row;
  justify-content: space-between;

  /* 아이폰 SE UI  */
  @media screen and (max-width: 375px) {
    width: 70%;
    margin-bottom: 5%;
  }

  @media screen and (max-width: 599px) and (min-width: 376px) {
    width: 80%;
    margin-bottom: 5%;
  }
`;

const YesBtn = styled.button`
  width: 147px;
  height: 54px;
  background-color: white;
  border-radius: 10px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;

  /* 아이폰 SE UI  */
  @media screen and (max-width: 375px) {
    width: 100px;
    height: 42px;

    font-size: 20px;
  }

  @media screen and (max-width: 599px) and (min-width: 376px) {
    width: 110px;
    height: 45px;
  }
`;

const NoBtn = styled.button`
  width: 147px;
  height: 54px;
  background-color: white;
  border-radius: 10px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 22px;

  /* 아이폰 SE UI  */
  @media screen and (max-width: 375px) {
    width: 100px;
    height: 42px;

    font-size: 20px;
  }

  @media screen and (max-width: 599px) and (min-width: 376px) {
    width: 110px;
    height: 45px;
  }
`;

export default Alert;
