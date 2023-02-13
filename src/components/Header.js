import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../images/logo.svg';
import { removeCookie } from '../util/Cookie';
import { toast } from 'react-toastify';

const Header = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    removeCookie('refreshToken');
    setIsLogin(!isLogin);
    navigate('/');
    toast('로그아웃 되었습니다.');
  };
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <HeaderContainer isDisplay={props.isDisplay}>
      <HeaderWrapper>
        <Link to={'/'}>
          <LogoBox />
        </Link>
        <LinkBox isBtn={props.isBtn}>
          {isLogin ? (
            <Button onClick={handleLogout}>로그아웃</Button>
          ) : (
            <>
              <Link to={'/login'}>
                <Button>로그인</Button>
              </Link>
              <p>|</p>
              <Link to={'/register'}>
                <Button>회원가입</Button>
              </Link>
            </>
          )}
        </LinkBox>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 90px;

  @media screen and (max-width: 599px) and (min-width: 375px) {
    display: ${(props) => (props.isDisplay ? 'flex' : 'none')};
  }
`;

const HeaderWrapper = styled.header`
  height: 90px;
  padding: 0px 2%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled(Logo)`
  margin-left: 10px;
  cursor: pointer;
`;

const LinkBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  display: ${(props) => (props.isBtn ? 'flex' : 'none')};
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

export default Header;
