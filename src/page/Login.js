import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import useToast from '../hook/useToast';
import Axios from '../lib/axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const LoginPage = function () {
  const { register, handleSubmit, watch } = useForm();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const subscribe = watch((data) => {
      if (data.id && data.password) {
        setIsValid(true);
      } else setIsValid(false);
    });
    return () => subscribe.unsubscribe();
  }, []);
  const [, addToast] = useToast();

  const loginHandle = async (data) => {
    try {
      const resp = await Axios.post('/user', {
        email: data.id,
        password: data.password,
      });

      const { token } = resp.data;
      localStorage.setItem('access-token', token);
      Axios.defaults.headers.Authorization = `Bearer ${token}`;

      location.href = '/';
    } catch (e) {
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
      <LoginContainer onSubmit={handleSubmit(loginHandle)}>
        <Title>로그인</Title>
        <IdInput placeholder='아이디' type={'text'} {...register('id')} />
        <PasswordInput
          placeholder='비밀번호'
          type={'password'}
          {...register('password')}
        />
        <LoginButton
          type='submit'
          onClick={loginHandle}
          active={isValid}
          disabled={isValid}
        >
          로그인
        </LoginButton>

        <Link to={'/register'}>
          <RegisterButton>회원가입</RegisterButton>
        </Link>
      </LoginContainer>
    </>
  );
};

const LoginContainer = styled.form`
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

const LoginButton = styled.button`
  width: 300px;
  height: 64px;

  margin-top: 39px;
  font-size: 30px;

  background-color: #d9d9d9;
  border: none;
  color: white;

  border-radius: 20px;
  ${(props) =>
    props.active &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
    `}
`;

const RegisterButton = styled.button`
  margin-top: 19px;
  font-size: 18px;

  background: none;
  border: none;
  color: #aaaaaa;
`;

const IdInput = styled.input`
  width: 433px;
  height: 92px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  border: 2px solid #bbbbbb;
  border-bottom: none;
  padding-left: 20px;

  :focus {
    outline: #bbbbbb;
  }
`;

const PasswordInput = styled.input`
  width: 433px;
  height: 92px;

  border: 2px solid #bbbbbb;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-left: 20px;

  :focus {
    outline: #bbbbbb;
  }
`;

export default LoginPage;
