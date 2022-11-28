import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { tryRegister } from '../api/LoginRegister';

function RegisterPage() {
  const [isValid, setIsValid] = useState(false);
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
      await tryRegister(data);
      toast('회원가입 완료!');
      navigate('/login');
    } catch (e) {
      const errorCode = e.response.data.errorCode;

      switch (errorCode) {
        case 'EMAIL_EXITS':
          toast('이미 존재하는 이메일입니다');
          break;
        case 'NAME_EXISTS':
          toast('이미 사용중인 이름입니다');
          break;
      }
    }
  };

  return (
    <SigninContainer onSubmit={handleSubmit(registerHandle, onInValid)}>
      <Title>회원가입</Title>
      <NameInput placeholder='이름' type={'text'} {...register('name')} />
      <IdInput placeholder='아이디' type={'text'} {...register('id')} />
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
    </SigninContainer>
  );
}

const SigninContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  margin-bottom: 20px;
  user-select: none;
`;

const NameInput = styled.input`
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

const IdInput = styled.input`
  width: 433px;
  height: 92px;
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
  padding-left: 20px;
  :focus {
    outline: #bbbbbb;
  }
  :nth-last-child(2) {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

const RegisterButton = styled.button`
  width: 300px;
  height: 64px;
  margin-top: 39px;
  font-size: 30px;
  border: none;
  color: white;
  border-radius: 20px;
  ${(props) =>
    props.active
      ? css`
          background-color: ${({ theme }) => theme.colors.green};
        `
      : css`
          background-color: #d9d9d9;
        `}
`;

export default RegisterPage;
