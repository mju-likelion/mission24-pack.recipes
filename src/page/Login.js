import { useState } from 'react';
import styled from 'styled-components';
import useToast from '../hooks/useToast';
import Axios from '../lib/axios';
import { Link } from 'react-router-dom';

const LoginPage = function () {
  const [, addToast] = useToast();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const idHandle = (e) => setId(e.target.value);
  const passwordHandle = (e) => setPassword(e.target.value);

  const loginHandle = async () => {
    try {
      const resp = await Axios.post('/users', {
        email: id,
        password: password,
      });

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
        <LoginButton onClick={loginHandle}>로그인</LoginButton>

        <Link to={'/register'}>
          <RegisterButton>회원가입</RegisterButton>
        </Link>
      </LoginContainer>
    </>
  );
};

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 30px;
`;

const Title = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  margin-bottom: 20px;
  user-select: none;
`;

export const LoginButton = styled.button`
  width: 300px;
  height: 64px;
  margin-top: 39px;
  font-size: 30px;
  background-color: #d9d9d9;
  border: none;
  color: white;
  border-radius: 20px;
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

export const Input = styled.input`
  width: 433px;
  height: 92px;
  border: 2px solid #bbbbbb;
  :focus {
    outline: #bbbbbb;
  }
  padding-left: 20px;
  @media screen and (max-width: 599px) {
    width: 70%;
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
