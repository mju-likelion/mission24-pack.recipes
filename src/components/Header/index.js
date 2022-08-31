import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../images/logo.svg';

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <Link to={'/'}>
          <LogoBox>잘챙기짐! </LogoBox>
        </Link>
        <LinkBox>
          <Link to={'/login'}>
            <Button>로그인</Button>
          </Link>
          <a>|</a>
          <Link to={'/register'}>
            <Button>회원가입</Button>
          </Link>
        </LinkBox>
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0px 65px;
`;

const LogoBox = styled(Logo)`
  cursor: pointer;
`;

const LinkBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

export default Header;
