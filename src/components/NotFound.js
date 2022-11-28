import { ReactComponent as ErrorIcon } from '../images/Error.svg';
import React from 'react';
import styled from 'styled-components';

const Error = () => {
  return (
    <Wrapper>
      <ErrorIcon />
      <Text>Error 404</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  margin-top: 90px;
  font-size: 30px;
`;

export default Error;
