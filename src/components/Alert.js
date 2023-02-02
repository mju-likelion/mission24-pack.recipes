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

const Title = styled.div`
  font-size: 40px;
  margin-bottom: 37px;
`;

const Description = styled.div`
  font-size: 24px;
  margin-bottom: 37px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 383px;
  margin-bottom: 63px;

  flex-direction: row;
  justify-content: space-between;
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
`;

export default Alert;
