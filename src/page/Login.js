import { useState } from 'react';
import styled from 'styled-components';
import useToast from '../hook/useToast';
import Axios from '../lib/axios';

const LoginPage = function () {
  const [, addToast] = useToast();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const idHandle = (e) => setId(e.target.value);
  const passwordHandle = (e) => setPassword(e.target.value);

  const loginHandle = async () => {
    try {
      const resp = await Axios.post('/user', { email: id, password: password });

      const { token } = resp.data;
      //console.log(token);
      localStorage.setItem('access-token', token);
      Axios.defaults.headers.Authorization = `Bearer ${token}`;

      location.href = '/';
    } catch (e) {
      //console.log(e);
      const errorCode = e.response.data.errorCode;

      switch (errorCode) {
        case 'EMAIL_NOT_EXISTS':
          addToast('존재하지 않는 계정입니다!', 2000);
          break;
      }
    }
  };

  return (
    <>
      <LoginContainer>
        <Title>로그인</Title>
        <IdInput
          placeholder='아이디'
          type={'text'}
          value={id}
          onChange={idHandle}
          id='id'
        />
        <PasswordInput
          placeholder='비밀번호'
          type={'password'}
          value={password}
          onChange={passwordHandle}
          id='password'
        />
        <LoginButton onClick={loginHandle}>로그인하기</LoginButton>
        <RegisterButton>회원가입</RegisterButton>
      </LoginContainer>
    </>
  );
};

const Title = styled.div`
  font-size: 40px;
  padding: 10px;
  margin-bottom: 20px;
`;

export const LoginButton = styled.button`
  width: 390px;
  height: 70px;
  margin-top: 39px;
  font-size: 34px;
  background-color: #d9d9d9;
  border: none;
  color: white;
  border-radius: 30px;
  @media screen and (max-width: 599px) {
    width: 150px;
    height: 40px;
    font-size: 20px;
    border-radius: 10px;
  }
`;

const RegisterButton = styled.button`
  margin-top: 19px;
  font-size: 18px;
  background: none;
  border: none;
  color: #aaaaaa;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  width: 433px;
  height: 92px;
  border: 2px solid #bbbbbb;
  :focus {
    outline: #bbbbbb;
  }
  padding-left: 20px;
  @media screen and (max-width: 599px) {
    width: 80%;
    font-size: 20px;
  }
`;

const IdInput = styled(Input)`
  border-radius: 20px 20px 0 0;
  border-bottom: none;
`;

const PasswordInput = styled(Input)`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-radius: 0 0 20px 20px;
`;

export default LoginPage;
