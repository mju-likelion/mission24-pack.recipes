import { useState } from 'react';
import styled from 'styled-components';
import useToast from '../hook/useToast';
import { ReactComponent as Logo } from '../images/logo.svg';
import Axios from '../lib/axios';

function RegisterPage() {
  const [, addToast] = useToast();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const idHandle = (e) => setId(e.target.value);
  const nameHandle = (e) => setName(e.target.value);
  const passwordHandle = (e) => setPassword(e.target.value);

  const registerHandle = async () => {
    try {
      await Axios.put('/user', { email: id, password: password, name: name });
      addToast('회원가입 완료!', 2000);
    } catch (e) {
      const errorCode = e.response.data.errorCode;
      console.log(errorCode);
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
        <StyledLogo />
        <IdInput type={'text'} value={id} onChange={idHandle} id='id' />
        <NameInput type={'text'} value={name} onChange={nameHandle} id='name' />
        <PasswordInput
          type={'text'}
          value={password}
          onChange={passwordHandle}
          id='password'
        />
        <LoginButton onClick={registerHandle}>회원가입</LoginButton>
      </LoginContainer>
    </>
  );
}

const StyledLogo = styled(Logo)`
  margin-bottom: 24px;
`;

const LoginButton = styled.button`
  width: 396px;
  height: 67px;

  margin-top: 39px;
  font-size: 34px;

  background-color: #d9d9d9;
  border: none;
  color: white;
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

const NameInput = styled.input`
  width: 433px;
  height: 92px;

  border-bottom: none;
`;

const PasswordInput = styled.input`
  width: 433px;
  height: 92px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export default RegisterPage;
