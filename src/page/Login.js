import { useState } from 'react';
import styled from 'styled-components';

const LoginPage = function () {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const idHandle = (e) => setId(e.target.value);
  const passwordHandle = (e) => setPassword(e.target.value);

  return (
    <>
      <LoginContainer>
        <div>잘챙기짐</div>
        <IdInput type={'text'} value={id} onChange={idHandle} id='id' />
        <PasswordInput
          type={'text'}
          value={password}
          onChange={passwordHandle}
          id='password'
        />
        <LoginButton>로그인</LoginButton>
        <RegisterButton>회원가입</RegisterButton>
      </LoginContainer>
    </>
  );
};

const LoginButton = styled.button`
  width: 396px;
  height: 67px;

  margin-top: 39px;
  font-size: 34px;

  background-color: #d9d9d9;
  border: none;
  color: white;
`;

const RegisterButton = styled.button`
  margin-top: 19px;
  font-size: 24px;

  background: none;
  border: none;
  color: #aaaaaa;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  justify-content: center;
  align-items: center;
`;

const IdInput = styled.input`
  width: 433px;
  height: 92px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  border-bottom: none;
`;

const PasswordInput = styled.input`
  width: 433px;
  height: 92px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export default LoginPage;
