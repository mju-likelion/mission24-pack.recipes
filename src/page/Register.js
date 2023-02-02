import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Input,
  LoginButton as RegisterButton,
  Title,
  LoginContainer,
} from './Login';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { tryRegister } from '../api/LoginRegister';
import Loading from '../components/Loading';

function RegisterPage() {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, watch, handleSubmit, getValues } = useForm();

  //버튼 비활성화를 위해 입력창값들이 바뀔 때마다 버튼 비활성화 여부 판단
  useEffect(() => {
    const subscribe = watch((data) => {
      if (data.name && data.id && data.password && data.confirmPassword)
        setIsValid(true);
      else setIsValid(false);
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  //유효성 검사에서 오류가 있을 때 토스트 메세지를 띄워줄 함수
  function onInValid(error) {
    if (error.id) toast(error.id.message, 2000);
    else toast(error.confirmPassword.message, 2000);
  }

  const registerHandle = async (data) => {
    try {
      setIsLoading(true);
      await tryRegister(data);
      setIsLoading(false);
      toast('회원가입에 성공했습니다!');
      navigate('/login');
    } catch (e) {
      setIsLoading(false);
      const errorCode = e.response.data.errorCode;

      switch (errorCode) {
        case 'EMAIL_EXITS':
          toast('이미 존재하는 아이디입니다.');
          break;
        case 'NAME_EXISTS':
          toast('이미 사용 중인 닉네임입니다.');
          break;
      }
    }
  };

  return (
    <RegisterContainer onSubmit={handleSubmit(registerHandle, onInValid)}>
      {isLoading && <Loading />}
      <Title>회원가입</Title>
      <NameInput placeholder='닉네임' type={'text'} {...register('name')} />
      <Input placeholder='아이디' type={'text'} {...register('id')} />
      <PasswordInput
        placeholder='비밀번호'
        type={'password'}
        {...register('password')}
      />

      <PasswordInput
        placeholder='비밀번호 확인'
        type={'password'}
        {...register('confirmPassword', {
          validate: {
            confirmPassword: (pw) =>
              pw === getValues('password') || '동일한 비밀번호를 입력해주세요',
          },
        })}
      />
      <RegisterButton active={isValid} type='submit' disabled={!isValid}>
        회원가입
      </RegisterButton>
    </RegisterContainer>
  );
}

const RegisterContainer = styled(LoginContainer)`
  margin-bottom: 40px;
`;

const NameInput = styled(Input)`
  border-radius: 20px 20px 0 0;
  border-bottom: none;
`;

const PasswordInput = styled(Input)`
  border-top: none;
  :nth-last-child(2) {
    border-radius: 0 0 20px 20px;
  }
`;

export default RegisterPage;
