import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <Logo>잘챙기짐! </Logo>
        <div>
          <Button onClick={() => {}}>로그인</Button>|
          <Button onClick={() => {}}>회원가입</Button>
        </div>
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0px 65px;
`;

const Logo = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

export default Header;
