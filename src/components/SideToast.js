import styled from 'styled-components';
import useSideToast from '../hook/useSideToast';

function SideToast() {
  const [toasts, , deleteToast] = useSideToast();

  const onToastClick = (toast) => {
    deleteToast(toast);
  };

  return (
    <>
      <SideToastWrapper>
        {toasts.map((toast, index) => (
          <SideToastItem key={index}>
            {toast.toastMsg}
            <SideToastClose onClick={() => onToastClick(toast)} />
          </SideToastItem>
        ))}
      </SideToastWrapper>
    </>
  );
}

const SideToastClose = styled.div`
  position: relative;
  background-color: red;
  width: 16px;
  height: 16px;
  border-radius: 8px;
`;

const SideToastWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  width: 100vw;
  height: 100vh;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;
const SideToastItem = styled.div`
  width: 280px;
  height: 90px;

  border-radius: 20px;

  background-color: #d6e8e3;
  color: white;

  margin-top: 10px;
  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SideToast;
