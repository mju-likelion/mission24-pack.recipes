/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useToast, { ToastElem } from '../hook/useToast';

/**
 *
 * @param {{toast: ToastElem, msg: string}} param0
 * @returns
 */
function ToastElement({ toast, msg }) {
  const toastRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      toastRef.current.style['animation-name'] = 'slideout';
      toastRef.current.style['animation-duration'] = '0.3s';
    }, toast.disappearTime - 300);
  }, []);
  return (
    <>
      <ToastItem ref={toastRef}>{msg}</ToastItem>
    </>
  );
}

function Toast() {
  const [toasts] = useToast();

  return (
    <>
      <ToastWrapper>
        {toasts.map((toast, index) => {
          return (
            <ToastElement key={index} toast={toast} msg={toast.toastMsg} />
          );
        })}
      </ToastWrapper>
    </>
  );
}

const ToastWrapper = styled.div`
  width: 100%;
  position: absolute;
  height: 100px;
  bottom: 50px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ToastItem = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 392px;
  background-color: #d6e8e3;
  color: black;
  border-radius: 20px;

  animation-duration: 1s;
  animation-name: slidein;
  animation-fill-mode: backwards;

  @keyframes slidein {
    from {
      opacity: 0;
      transform: translate(0px, 20px);
    }

    to {
      opacity: 1;
      transform: translate(0px, 0px);
    }
  }

  @keyframes slideout {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
`;

export default Toast;
