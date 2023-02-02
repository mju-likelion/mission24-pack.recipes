import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from '../lib/axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { setCookie } from '../util/Cookie';
import { tryLogin } from '../api/LoginRegister';
import Loading from '../components/Loading';

const LoginPage = function () {
  const { register, handleSubmit, watch } = useForm();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscribe = watch((data) => {
      if (data.id && data.password) {
        setIsValid(true);
      } else setIsValid(false);
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  const loginHandle = async (data) => {
    try {
      setIsLoading(true);
      const res = await tryLogin(data);
      setIsLoading(false);
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem('accessToken', accessToken);
      Axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
      setCookie('refreshToken', refreshToken);
      location.href = '/';
    } catch (e) {
      setIsLoading(false);
      const errorCode = e.response.data.errorCode;
      switch (errorCode) {
        case 'EMAIL_NOT_EXISTS':
          toast('존재하지 않는 계정입니다. 다시 확인해 주세요.');
          break;
      }
    }
  };

  return (
    <LoginContainer onSubmit={handleSubmit(loginHandle)}>
      {isLoading && <Loading />}
      <Title>로그인</Title>
      <IdInput placeholder='아이디' type={'text'} {...register('id')} />
      <PasswordInput
        placeholder='비밀번호'
        type={'password'}
        {...register('password')}
      />
      <LoginButton type='submit' active={isValid} disabled={!isValid}>
        로그인
      </LoginButton>

      <Link to={'/register'}>
        <RegisterButton>회원가입</RegisterButton>
      </Link>
    </LoginContainer>
  );
};

export const LoginContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10% 0 30px 0;
  @media screen and (min-width: 375px) and (max-width: 599px) {
    margin-bottom: 182px;
  }
`;

export const Title = styled.div`
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
  border: none;
  color: white;
  border-radius: 20px;
  @media screen and (min-width: 375px) and(max-width: 599px) {
    width: 150px;
    height: 40px;
    font-size: 20px;
    border-radius: 10px;
  }
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : '#d3d3d3'};
`;

const RegisterButton = styled.button`
  margin-top: 25px;
  font-size: 24px;
  background: none;
  border: none;
  color: #aaaaaa;
  @media screen and (min-width: 375px) and(max-width: 599px) {
    font-size: 18px;
  }
`;

export const Input = styled.input`
  width: 433px;
  height: 92px;
  border: 2px solid #bbbbbb;
  :focus {
    outline: #bbbbbb;
  }
  padding-left: 20px;
  @media screen and (min-width: 375px) and (max-width: 599px) {
    width: 80%;
    font-size: 20px;
  }
`;

const IdInput = styled(Input)`
  border-radius: 20px 20px 0 0;
  border-bottom: none;
`;

const PasswordInput = styled(Input)`
  border-radius: 0 0 20px 20px;
`;

export default LoginPage;
