import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as GreenApple } from '../images/greenApple.svg';

const Loading = () => {
  const [isRotated, setIsRotated] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRotated(!isRotated);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isRotated]);

  return (
    <Backgroud>
      <LoadingContainer>
        <StyledGreenApple isrotated={isRotated ? 1 : 0} />
        <StyledText>loading</StyledText>
        <StyledText>· · ·</StyledText>
      </LoadingContainer>
    </Backgroud>
  );
};

const Backgroud = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(70, 70, 70, 0.7);
  padding: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 120;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StyledGreenApple = styled(GreenApple)`
  transform: ${(props) => (props.isrotated ? 'rotate(0)' : 'rotate(30deg)')};
  transition: transform 1000ms ease;
  width: 97px;
  height: 54px;
`;

const StyledText = styled.div`
  font-size: 30px;
  font-weight: 400;
  line-height: 33px;
  color: white;
  :nth-child(2) {
    margin-top: 46px;
  }
`;

export default Loading;
