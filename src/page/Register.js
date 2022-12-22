import { useState } from 'react';
import styled from 'styled-components';
import useToast from '../hooks/useToast';
import Axios from '../lib/axios';
import {
  Input,
  LoginButton as RegisterButton,
  Title,
  LoginContainer,
} from './Login';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [, addToast] = useToast();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const idHandle = (e) => setId(e.target.value);
  const nameHandle = (e) => setName(e.target.value);
  const passwordHandle = (e) => setPassword(e.target.value);

  const registerHandle = async () => {
    try {
      await Axios.put('/users', { email: id, password: password, name: name });

      addToast('회원가입 완료!', 2000);
      navigate('/login');
    } catch (e) {
      const errorCode = e.response.data.errorCode;
      //console.log(errorCode);
      switch (errorCode) {
        case 'EMAIL_EXITS':
          addToast('이미 존재하는 이메일입니다', 2000);
          break;
        case 'NAME_EXISTS':
          addToast('이미 사용중인 이름입니다', 2000);
          break;
      }
    }
  };

  return (
    <>
      <RegisterContainer>
        <Title>회원가입</Title>
        <NameInput
          placeholder='이름'
          type={'text'}
          value={name}
          onChange={nameHandle}
          id='name'
        />
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
        <RegisterButton onClick={registerHandle}>회원가입</RegisterButton>
      </RegisterContainer>
    </>
  );
}

const RegisterContainer = styled(LoginContainer)`
  margin-bottom: 40px;
`;

const NameInput = styled(Input)`
  border-radius: 20px 20px 0 0;
  border-bottom: none;
`;

const IdInput = styled(Input)`
  border-bottom: none;
`;

const PasswordInput = styled(Input)`
  :nth-last-child(2) {
    border-radius: 0 0 20px 20px;
    border-top: none;
  }
`;

export default RegisterPage;
