import { useState } from 'react';
import styled from 'styled-components';
import useToast from '../hooks/useToast';
import Axios from '../lib/axios';
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
      await Axios.post('/auth/register', {
        email: id,
        password: password,
        name: name,
      });

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
      <LoginContainer>
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
      </LoginContainer>
    </>
  );
}

const LoginContainer = styled.div`
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
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-left: 20px;

  :focus {
    outline: #bbbbbb;
  }
`;

const RegisterButton = styled.button`
  width: 300px;
  height: 64px;

  margin-top: 39px;
  font-size: 30px;

  background-color: #d9d9d9;
  border: none;
  color: white;

  border-radius: 20px;
`;

export default RegisterPage;
