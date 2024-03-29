import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loading from '../components/Loading';
import { useLogin } from '../hooks/useAuth';
import Header from '../components/Header';

const LoginPage = () => {
  const { register, handleSubmit, watch } = useForm();
  const [isValid, setIsValid] = useState(false);
  const { mutateAsync, isLoading } = useLogin();
  useEffect(() => {
    const subscribe = watch((data) => {
      if (data.id && data.password) {
        setIsValid(true);
      } else setIsValid(false);
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  const loginHandle = async (data) => {
    await mutateAsync(data);
  };

  return (
    <>
      <Header isDisplay isBtn={false} />
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
          확인
        </LoginButton>

        <Link to={'/register'}>
          <RegisterButton>회원가입</RegisterButton>
        </Link>
      </LoginContainer>
    </>
  );
};

export const LoginContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5% 0 5% 0;
`;

export const Title = styled.div`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  margin-bottom: 5%;
  user-select: none;

  @media screen and (min-width: 375px) and (max-width: 599px) {
    margin-bottom: 8%;
    font-size: 40px;
  }
`;

export const LoginButton = styled.button`
  width: 300px;
  height: 64px;

  margin-top: 39px;
  font-size: 30px;
  border: none;
  color: white;
  border-radius: 20px;

  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : '#d3d3d3'};

  @media screen and (max-width: 599px) and (min-width: 375px) {
    width: 40%;
    height: 50px;
    font-size: 22px;
    border-radius: 10px;
  }
`;

const RegisterButton = styled.button`
  margin-top: 25px;
  font-size: 24px;
  background: none;
  border: none;
  color: #aaaaaa;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    font-size: 18px;
  }
`;

export const Input = styled.input`
  width: 433px;
  height: 92px;
  border: 2px solid #bbbbbb;
  padding-left: 20px;

  :focus {
    outline: #bbbbbb;
  }

  @media screen and (min-width: 375px) and (max-width: 599px) {
    width: 76%;
    height: 80px;
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
