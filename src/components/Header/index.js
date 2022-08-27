import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../images/logo.svg';

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <LogoBox>잘챙기짐! </LogoBox>
        {/* <div>
          <Button onClick={() => {}}>로그인</Button>|
          <Button onClick={() => {}}>회원가입</Button>
        </div> */}
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

const LogoBox = styled(Logo)`
  cursor: pointer;
`;

// const Button = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 14px;
// `;

export default Header;
